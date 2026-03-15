import { getClient } from '../../lib/sanity'
import {
  BLOG_POSTS_QUERY,
  BLOG_POSTS_BY_CATEGORY_QUERY,
} from '../../lib/queries'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { start, end, category } = req.query
    const startNum = parseInt(start as string, 10) || 0
    const endNum = parseInt(end as string, 10) || 8
    const categorySlug =
      typeof category === 'string' && category.length > 0 ? category : null

    const client = getClient()
    const query = categorySlug ? BLOG_POSTS_BY_CATEGORY_QUERY : BLOG_POSTS_QUERY
    const params: { start: number; end: number; categorySlug?: string } = {
      start: startNum,
      end: endNum,
    }
    if (categorySlug) params.categorySlug = categorySlug

    const posts = await client.fetch(query, params)

    res.status(200).json(posts)
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    res.status(500).json({ error: 'Failed to fetch blog posts' })
  }
}
