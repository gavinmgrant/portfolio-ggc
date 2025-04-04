'use client'

import { Form, Input, Button } from '@heroui/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import ProjectCard from '../../components/ProjectCard'
import Loader from '../../components/Loader'

export const SearchPage = () => {
  const {
    query: { query: queryFromUrl },
  } = useRouter()

  const [searchString, setSearchString] = useState(
    typeof queryFromUrl === 'string' ? queryFromUrl : ''
  )
  const [searchResults, setSearchResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  async function getResponse() {
    if (!searchString || searchString.trim() === '') return

    setShowResults(true)
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/search?query=${encodeURIComponent(searchString)}`,
        {
          method: 'GET',
        }
      )

      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      console.error('Search error:', error)
      setSearchResults([])
    } finally {
      setIsLoading(false)
      setShowResults(true)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setShowResults(false)
    if (searchString === '' || searchString.trim() === '') return
    getResponse()
  }

  const handleChange = (e) => {
    setSearchString(e.target.value)
    if (e.target.value === '') {
      setShowResults(false)
    }
  }

  return (
    <div className="mx-auto grid grid-cols-1 gap-4 px-4 pb-4 pt-[72px] sm:gap-6 sm:px-6 sm:pb-6 sm:pt-[104px] 2xl:max-w-[1536px]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <h1 className="heading-size-lg col-span-1 lg:col-span-2">Search</h1>
        <Form
          onSubmit={handleSubmit}
          className="col-span-1 flex flex-row items-center gap-3"
        >
          <Input
            value={searchString}
            onChange={handleChange}
            placeholder="Search for projects or blog posts..."
            className="flex-1"
          />
          <Button type="submit">Search</Button>
        </Form>
      </div>

      {showResults ? (
        <div className="col-span-full">
          {isLoading ? (
            <div className="col-span-full flex min-h-24 flex-col items-center justify-center text-center">
              <Loader />
            </div>
          ) : searchResults.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {searchResults.map((result, index) => (
                <ProjectCard
                  key={result.slug}
                  index={index}
                  slug={result.slug}
                  imgsrc={null}
                  name={result.name || result.title}
                  description={result.description}
                  type={result.type}
                />
              ))}
            </div>
          ) : (
            <div className="col-span-full flex min-h-24 flex-col items-center justify-center text-center">
              <p>No results found for "{searchString}"</p>
            </div>
          )}
        </div>
      ) : (
        <div className="col-span-full flex min-h-24 flex-col items-center justify-center text-center">
          <p>Enter your query above to search for projects or blog posts.</p>
        </div>
      )}
    </div>
  )
}

export default SearchPage
