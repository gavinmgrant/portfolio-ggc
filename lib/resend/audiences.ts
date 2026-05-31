import { getResendAudienceId, getResendClient } from './client'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email)
}

export async function addSubscriber(email: string): Promise<void> {
  const normalizedEmail = email.trim().toLowerCase()

  if (!isValidEmail(normalizedEmail)) {
    throw new Error('Invalid email address')
  }

  const resend = getResendClient()
  const audienceId = getResendAudienceId()

  const { data, error } = await resend.contacts.create({
    audienceId,
    email: normalizedEmail,
    unsubscribed: false,
  })

  if (error) {
    const message = error.message?.toLowerCase() ?? ''
    if (
      message.includes('already') ||
      message.includes('exists') ||
      message.includes('duplicate')
    ) {
      console.log('newsletter subscribe: contact already exists', normalizedEmail)
      return
    }
    throw new Error(error.message || 'Failed to add subscriber')
  }

  console.log('newsletter subscribe: contact added', data?.id ?? normalizedEmail)
}
