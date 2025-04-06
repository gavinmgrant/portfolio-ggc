import { getClient } from '../../lib/sanity'
import type { NextApiRequest, NextApiResponse } from 'next'
import { SEARCH_QUERY } from '../../lib/queries'

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
