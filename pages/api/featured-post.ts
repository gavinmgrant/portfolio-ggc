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

    // Filter posts with the featured flag set to true
    const featuredPosts = posts.filter((post: any) => post.featured)

    // Return the first featured post or null
    const featuredPost = featuredPosts.length > 0 ? featuredPosts[0] : null

    res.status(200).json(featuredPost)
  } catch (error) {
    console.error('Error fetching featured blog post:', error)
    res.status(500).json({ error: 'Failed to fetch featured blog post' })
  }
}
