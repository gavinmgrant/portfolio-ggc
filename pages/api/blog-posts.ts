import { getClient } from '../../lib/sanity'
import { BLOG_POSTS_QUERY } from '../../lib/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { start, end } = req.query
    const startNum = parseInt(start as string, 10) || 0
    const endNum = parseInt(end as string, 10) || 8

    const client = getClient()
    const posts = await client.fetch(BLOG_POSTS_QUERY, {
      start: startNum,
      end: endNum,
    })

    res.status(200).json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    res.status(500).json({ error: 'Failed to fetch blog posts' })
  }
}
