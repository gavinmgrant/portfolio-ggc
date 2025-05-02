import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import ProjectCard from '../../components/ProjectCard'
import Loader from '../../components/Loader'
import ogImage from '../../public/images/gavin-grant-og.png'
import { getSanityImageUrl } from '../../utils/getSanityImageUrl'
import { IconAlertSquareRounded } from '@tabler/icons-react'

export const SearchPage = () => {
  const router = useRouter()
  const {
    query: { query: queryFromUrl },
  } = router

  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getResponse(query) {
    if (!query || query.trim() === '') {
      setSearchResults([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(query)}`,
        {
          method: 'GET',
        }
      )

      const data = await response.json()
      setSearchResults(data)
      console.log('Search results:', data)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
    }
  }

  // Trigger search when URL query changes
  useEffect(() => {
    console.log('Query changed:', queryFromUrl)
    getResponse(queryFromUrl)
  }, [queryFromUrl])

  const description =
    'Search for projects and blog posts created by Gavin Grant Consulting.'

  const noResultsClass =
    'min-height-viewport col-span-full flex flex-col items-center justify-center text-center'

  return (
    <div>
      <Head>
        <title>Search | Gavin Grant Consulting</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Gavin Grant" />
        <meta property="og:site_name" content="Gavin Grant Consulting" />
        <meta property="og:title" content="Search" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage.src} />
      </Head>
      <div className="page-padding grid grid-cols-1 gap-4 sm:gap-6 2xl:max-w-[1536px]">
        <div className="col-span-full">
          {isLoading ? (
            <div className={noResultsClass}>
              <Loader />
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              <p>
                Search results for "{queryFromUrl}". {searchResults.length}{' '}
                {searchResults.length === 1 ? 'result' : 'results'} found.
              </p>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((result, index) => (
                  <ProjectCard
                    key={result.slug}
                    index={index}
                    slug={result.slug}
                    imgsrc={getSanityImageUrl(result.image.asset._ref)}
                    name={result.name || result.title}
                    description={result.description}
                    type={result.type}
                  />
                ))}
              </div>
            </div>
          ) : queryFromUrl ? (
            <div className={noResultsClass}>
              <div className="flex items-center justify-center gap-2">
                <IconAlertSquareRounded className="size-7" />
                <p>No results found for "{queryFromUrl}"</p>
              </div>
            </div>
          ) : (
            <div className={noResultsClass}>
              <p>
                Enter your query above to search for projects or blog posts.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage
