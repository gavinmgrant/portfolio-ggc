import { getClient } from '../sanity'
import { NEWSLETTER_POSTS_QUERY } from '../queries'
import { getSiteUrl } from '../resend/client'
import { getSanityImageUrl } from '../../utils/getSanityImageUrl'
import type { NewsletterPost } from '../../types/newsletter'

type SanityNewsletterPost = {
  title: string
  slug: string
  publishDate: string
  featured?: boolean
  description?: string
  image?: {
    asset?: {
      _ref?: string
    }
  }
  categories?: {
    title: string
    slug: string
  }[]
}

function getNewsletterSinceDate(): string {
  const since = new Date()
  since.setDate(since.getDate() - 30)
  return since.toISOString().split('T')[0]
}

function mapPost(post: SanityNewsletterPost, siteUrl: string): NewsletterPost {
  const imageRef = post.image?.asset?._ref

  return {
    title: post.title,
    slug: post.slug,
    publishDate: post.publishDate,
    featured: post.featured,
    description: post.description?.trim() || '',
    imageUrl: imageRef ? getSanityImageUrl(imageRef, 600, 80) : undefined,
    url: `${siteUrl}/blog/${post.slug}`,
    categories: post.categories,
  }
}

export async function getNewsletterPosts(): Promise<NewsletterPost[]> {
  const client = getClient()
  const date = getNewsletterSinceDate()
  const siteUrl = getSiteUrl()

  const posts = (await client.fetch(NEWSLETTER_POSTS_QUERY, {
    date,
  })) as SanityNewsletterPost[] | null

  return (posts ?? []).map((post) => mapPost(post, siteUrl))
}

export function getMonthLabel(date = new Date()): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function getNewsletterSubject(monthLabel: string, postCount: number): string {
  if (postCount === 1) {
    return `New on the blog — ${monthLabel}`
  }
  return `${postCount} new posts — ${monthLabel}`
}

export const DEFAULT_NEWSLETTER_INTRO =
  "Here's what I published on my blog over the last month. Thanks for reading."
