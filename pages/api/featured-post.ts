import { getClient } from '../../lib/sanity'
import { FEATURED_BLOG_POSTS_QUERY } from '../../lib/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const client = getClient()
    const posts = await client.fetch(FEATURED_BLOG_POSTS_QUERY)
    res.status(200).json({ posts: Array.isArray(posts) ? posts : [] })
  } catch (error) {
    console.error('Error fetching featured blog posts:', error)
    res.status(500).json({ error: 'Failed to fetch featured blog posts' })
  }
}
