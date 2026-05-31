import { Resend } from 'resend'

let resendClient: Resend | null = null

export function getResendClient(): Resend {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error('RESEND_API_KEY is not configured')
  }

  if (!resendClient) {
    resendClient = new Resend(apiKey)
  }

  return resendClient
}

export function getResendAudienceId(): string {
  const audienceId = process.env.RESEND_AUDIENCE_ID
  if (!audienceId) {
    throw new Error('RESEND_AUDIENCE_ID is not configured')
  }
  return audienceId
}

export function getSiteUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  if (!siteUrl) {
    throw new Error('NEXT_PUBLIC_SITE_URL is not configured')
  }
  return siteUrl.replace(/\/$/, '')
}

export const NEWSLETTER_FROM =
  'Gavin Grant Consulting <gavin@gavingrant.com>'
