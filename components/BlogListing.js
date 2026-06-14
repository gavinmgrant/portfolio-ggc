import React, { useState, useEffect, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Loader from './Loader'
import ProjectCard from './ProjectCard'
import ogImage from '../public/images/gavin-grant-og.png'
import { getSanityImageUrl } from '../utils/getSanityImageUrl'
import { Button, Select, SelectItem } from '@heroui/react'
import NewsletterSubscribe from './NewsletterSubscribe'

function BlogCategorySelect({ categories, currentCategorySlug, className }) {
  const router = useRouter()
  const selectedKeys = useMemo(
    () =>
      currentCategorySlug ? new Set([currentCategorySlug]) : new Set(['all']),
    [currentCategorySlug]
  )

  const handleSelectionChange = (keys) => {
    if (keys === 'all') return
    const key = keys instanceof Set ? Array.from(keys)[0] : undefined
    if (key === 'all' || key == null) {
      router.push('/blog')
    } else {
      router.push(`/blog/category/${encodeURIComponent(String(key))}`)
    }
  }

  if (!categories?.length) return null

  return (
    <div className="w-full md:w-[360px]">
      <Select
        label="Category"
        className="w-full"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        selectionMode="single"
        disallowEmptySelection
      >
        <SelectItem className="ml-0" key="all" textValue="All blog posts">
          All blog posts
        </SelectItem>
        {categories.map((cat) => (
          <SelectItem className="ml-0" key={cat.slug} textValue={cat.title}>
            {cat.title}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}

export default function BlogListing({
  initialBlogPosts,
  totalPostCount,
  categories,
  currentCategorySlug,
  categoryTitle,
}) {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts ?? [])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 12
  const totalCount = totalPostCount ?? 0
  const hasMorePosts = blogPosts.length < totalCount

  useEffect(() => {
    setBlogPosts(initialBlogPosts ?? [])
    setCurrentPage(1)
  }, [currentCategorySlug, initialBlogPosts])

  const loadMorePosts = async () => {
    if (isLoading) return

    setIsLoading(true)
    const start = currentPage * postsPerPage
    const end = start + postsPerPage - 1
    const categoryParam = currentCategorySlug
      ? `&category=${encodeURIComponent(currentCategorySlug)}`
      : ''

    try {
      const response = await fetch(
        `/api/blog-posts?start=${start}&end=${end}${categoryParam}`
      )
      const newPosts = await response.json()

      setBlogPosts([...blogPosts, ...newPosts])
      setCurrentPage(currentPage + 1)
    } catch (error) {
      console.error('Error loading more posts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const description =
    'Blog posts written by front-end engineer Gavin Grant, sharing insights and experiences in web development, Next.js, and modern technologies.'

  const pageTitle = categoryTitle
    ? `${categoryTitle} | Blog | Gavin Grant Consulting`
    : 'Blog | Gavin Grant Consulting'

  const ogTitle = categoryTitle ? `${categoryTitle} | Blog` : 'Blog'

  const showEmptyState = blogPosts.length === 0 && totalCount === 0
  const showLoader = blogPosts.length === 0 && totalCount > 0

  if (showLoader) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    )
  }

  return (
    <div className="page-padding">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Gavin Grant" />
        <meta property="og:site_name" content="Gavin Grant Consulting" />
        <meta property="og:title" content={ogTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage.src} />
      </Head>

      <div className="flex flex-col gap-4 mb-4 sm:mb-6 md:flex-row items-start justify-between">
        <NewsletterSubscribe />

        <BlogCategorySelect
          categories={categories}
          currentCategorySlug={currentCategorySlug}
        />
      </div>

      {showEmptyState ? (
        <div className="flex min-h-[40vh] items-start justify-center md:items-center">
          <p className="text-muted-foreground">
            {currentCategorySlug
              ? 'No posts in this category yet.'
              : 'No posts yet.'}
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 2xl:max-w-[1536px] 2xl:grid-cols-3">
            {blogPosts.map((post, index) => {
              return (
                <ProjectCard
                  index={index}
                  key={post.metadata.slug.current}
                  slug={post.metadata.slug.current}
                  imgsrc={getSanityImageUrl(post.metadata.image.asset._ref)}
                  name={post.metadata.title}
                  description={post.metadata.description}
                  type="blog"
                  publishDate={post.publishDate}
                  readingTime={post.estimatedReadingTime}
                />
              )
            })}
          </div>

          {hasMorePosts && (
            <div className="pb-10 pt-4 flex items-center justify-center">
              <Button
                color="primary"
                radius="sm"
                size="lg"
                onPress={loadMorePosts}
                disabled={isLoading}
                isLoading={isLoading}
              >
                {isLoading ? 'Loading...' : 'Load More Posts'}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
