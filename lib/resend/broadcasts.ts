import { getResendAudienceId, getResendClient, NEWSLETTER_FROM } from './client'

type SendMonthlyBroadcastParams = {
  html: string
  subject: string
  name: string
  previewText?: string
}

export async function sendMonthlyBroadcast({
  html,
  subject,
  name,
  previewText,
}: SendMonthlyBroadcastParams): Promise<string> {
  const resend = getResendClient()
  const audienceId = getResendAudienceId()

  const { data: broadcast, error: createError } = await resend.broadcasts.create({
    name,
    audienceId,
    from: NEWSLETTER_FROM,
    subject,
    html,
    previewText,
  })

  if (createError || !broadcast?.id) {
    throw new Error(createError?.message || 'Failed to create broadcast')
  }

  const { data: sent, error: sendError } = await resend.broadcasts.send(broadcast.id)

  if (sendError || !sent?.id) {
    throw new Error(sendError?.message || 'Failed to send broadcast')
  }

  return sent.id
}
