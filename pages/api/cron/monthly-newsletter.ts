import type { NextApiRequest, NextApiResponse } from 'next'
import { render } from '@react-email/render'
import MonthlyNewsletterEmail from '../../../emails/monthly-newsletter'
import {
  DEFAULT_NEWSLETTER_INTRO,
  getMonthLabel,
  getNewsletterPosts,
  getNewsletterSubject,
} from '../../../lib/newsletter/posts'
import { sendMonthlyBroadcast } from '../../../lib/resend/broadcasts'
import { getSiteUrl } from '../../../lib/resend/client'
import type { MonthlyNewsletterCronResponse } from '../../../types/newsletter'

function isAuthorized(req: NextApiRequest): boolean {
  const cronSecret = process.env.CRON_SECRET
  if (!cronSecret) {
    return process.env.NODE_ENV !== 'production'
  }
  return req.headers.authorization === `Bearer ${cronSecret}`
}

function validateEnv(): string | null {
  if (!process.env.RESEND_API_KEY) return 'RESEND_API_KEY is not configured'
  if (!process.env.RESEND_AUDIENCE_ID) {
    return 'RESEND_AUDIENCE_ID is not configured'
  }
  if (!process.env.NEXT_PUBLIC_SITE_URL) {
    return 'NEXT_PUBLIC_SITE_URL is not configured'
  }
  return null
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<MonthlyNewsletterCronResponse>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ success: false, error: 'Unauthorized' })
  }

  const envError = validateEnv()
  if (envError) {
    console.error('monthly-newsletter cron:', envError)
    return res.status(500).json({ success: false, error: envError })
  }

  console.log('monthly-newsletter cron: started')

  try {
    const posts = await getNewsletterPosts()
    console.log('monthly-newsletter cron: posts fetched', posts.length)

    if (posts.length === 0) {
      return res.status(200).json({
        success: true,
        skipped: true,
        postCount: 0,
      })
    }

    const monthLabel = getMonthLabel()
    const siteUrl = getSiteUrl()
    const html = await render(
      MonthlyNewsletterEmail({
        posts,
        intro: DEFAULT_NEWSLETTER_INTRO,
        siteUrl,
        monthLabel,
      })
    )

    const subject = getNewsletterSubject(monthLabel, posts.length)
    const broadcastId = await sendMonthlyBroadcast({
      html,
      subject,
      name: `Monthly Blog Newsletter — ${monthLabel}`,
      previewText: subject,
    })

    console.log('monthly-newsletter cron: broadcast sent', {
      postCount: posts.length,
      broadcastId,
    })

    return res.status(200).json({
      success: true,
      postCount: posts.length,
      broadcastId,
    })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Newsletter cron failed'
    console.error('monthly-newsletter cron error:', message)
    return res.status(500).json({ success: false, error: message })
  }
}
