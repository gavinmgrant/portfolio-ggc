import { getClient } from '../../lib/sanity'
import type { NextApiRequest, NextApiResponse } from 'next'

// Define a type for the content items
interface ContentItem {
  _type: string
  title?: string
  name?: string
  slug?: string
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const client = getClient()

    // Get query from either query string or request body
    let queryString = ''
    if (req.method === 'GET') {
      queryString = (req.query.query as string) || ''
    } else if (req.method === 'POST') {
      // Only try to parse body for POST requests
      try {
        const body =
          typeof req.body === 'string' ? JSON.parse(req.body) : req.body || {}
        queryString = body.query || ''
      } catch (error) {
        console.error('Error parsing request body:', error)
        queryString = ''
      }
    }

    // Only search if we have a query string
    if (!queryString || queryString.trim() === '') {
      return res.status(200).json([])
    }

    // Format the query string for Sanity
    const formattedQuery = queryString.toLowerCase().trim()

    try {
      const blogPosts = await client.fetch(`*[_type == "blog.post"]`)
      const projects = await client.fetch(`*[_type == "project"]`)

      const allContent = [...blogPosts, ...projects]

      // Process the results to extract the fields we need
      const processedContent = allContent.map((item) => {
        if (item._type === 'blog.post') {
          return {
            _type: item._type,
            title: item.metadata?.title || '',
            name: '',
            slug: item.metadata?.slug?.current || '',
            description: item.metadata?.description || '',
          }
        } else {
          return {
            _type: item._type,
            title: '',
            name: item.name || '',
            slug: item.slug || '',
            description: item.description || '',
          }
        }
      })

      // Now filter the results in JavaScript
      const filteredResults = processedContent.filter((item: ContentItem) => {
        if (item._type === 'blog.post' && item.title) {
          return item.title.toLowerCase().includes(formattedQuery)
        }
        if (item._type === 'project' && item.name) {
          return item.name.toLowerCase().includes(formattedQuery)
        }
        return false
      })

      return res.status(200).json(filteredResults)
    } catch (error) {
      console.error('Error with simple query:', error)
      throw error // Re-throw to be caught by the outer try/catch
    }
  } catch (error) {
    console.error('Search API error:', error)

    if (error instanceof Error) {
      console.error('Error name:', error.name)
      console.error('Error message:', error.message)
      console.error('Error stack:', error.stack)
    }
    res
      .status(500)
      .json({ error: 'An error occurred while processing your search request' })
  }
}
