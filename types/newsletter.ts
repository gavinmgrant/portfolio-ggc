export type NewsletterCategory = {
  title: string
  slug: string
}

export type NewsletterPost = {
  title: string
  slug: string
  publishDate: string
  featured?: boolean
  description?: string
  imageUrl?: string
  url: string
  categories?: NewsletterCategory[]
}

export type NewsletterSubscribeResponse = {
  success: boolean
  error?: string
}

export type MonthlyNewsletterCronResponse = {
  success: boolean
  skipped?: boolean
  postCount?: number
  broadcastId?: string
  error?: string
}
