import type { NextApiRequest, NextApiResponse } from 'next'
import { addSubscriber } from '../../../lib/resend/audiences'
import type { NewsletterSubscribeResponse } from '../../../types/newsletter'

const domain = 'gavingrant.com'

type SubscribeBody = {
  email?: string
  website?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsletterSubscribeResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' })
  }

  const { email, website } = req.body as SubscribeBody

  if (website) {
    return res.status(200).json({ success: true })
  }

  if (!req.headers.referer || !req.headers.referer.includes(domain)) {
    return res.status(400).json({ success: false, error: 'Invalid referer' })
  }

  if (!email || typeof email !== 'string') {
    return res.status(400).json({ success: false, error: 'Email is required' })
  }

  try {
    await addSubscriber(email)
    return res.status(200).json({ success: true })
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'Failed to subscribe'
    console.error('newsletter subscribe error:', message)
    return res.status(400).json({ success: false, error: message })
  }
}
