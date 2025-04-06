import { getClient } from '../../lib/sanity'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SEARCH_QUERY } from '../../lib/queries'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const client = getClient()
    const queryString = (req.query.query as string) || ''

    // Return empty array if no query string provided
    if (!queryString.trim()) {
      return res.status(200).json([])
    }

    // Format the query string for Sanity
    const formattedQuery = queryString.toLowerCase().trim()

    try {
      // Use a GROQ query that filters at the database level
      const results = await client.fetch(SEARCH_QUERY, {
        query: formattedQuery,
      })

      return res.status(200).json(results)
    } catch (error) {
      console.error('Error with search query:', error)
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
