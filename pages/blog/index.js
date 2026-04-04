import React, { useState, useEffect, useMemo } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Loader from '../../components/Loader'
import ProjectCard from '../../components/ProjectCard'
import { getClient } from '../../lib/sanity'
import {
  BLOG_POSTS_QUERY,
  BLOG_POSTS_BY_CATEGORY_QUERY,
  BLOG_POST_COUNT_QUERY,
  BLOG_POST_COUNT_BY_CATEGORY_QUERY,
  BLOG_CATEGORIES_QUERY,
} from '../../lib/queries'
import ogImage from '../../public/images/gavin-grant-og.png'
import { getSanityImageUrl } from '../../utils/getSanityImageUrl'
import { Button, Select, SelectItem } from '@heroui/react'

function BlogCategorySelect({ categories, currentCategorySlug, className = 'page-padding' }) {
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
      router.push(`/blog?category=${encodeURIComponent(String(key))}`)
    }
  }

  if (!categories?.length) return null

  return (
    <div className={className}>
      <Select
        label="Category"
        className="w-full sm:w-[360px]"
        selectedKeys={selectedKeys}
        onSelectionChange={handleSelectionChange}
        selectionMode="single"
        disallowEmptySelection
      >
        <SelectItem key="all" textValue="All blog posts">
          All blog posts
        </SelectItem>
        {categories.map((cat) => (
          <SelectItem key={cat.slug} textValue={cat.title}>
            {cat.title}
          </SelectItem>
        ))}
      </Select>
    </div>
  )
}

export default function Blog({
  initialBlogPosts,
  totalPostCount,
  categories,
  currentCategorySlug,
}) {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts ?? [])
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 12
  const totalCount = totalPostCount ?? 0
  const hasMorePosts = blogPosts.length < totalCount

  // Sync state when props change (e.g. client-side nav to different category)
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

  if (!blogPosts.length)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    )

  const hasAnyPosts = blogPosts.length > 0

  if (!hasAnyPosts)
    return (
      <div>
        <Head>
          <title>Blog | Gavin Grant Consulting</title>
          <meta name="description" content={description} />
          <meta charSet="utf-8" />
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
          <meta name="author" content="Gavin Grant" />
          <meta property="og:site_name" content="Gavin Grant Consulting" />
          <meta property="og:title" content="Blog" />
          <meta property="og:description" content={description} />
          <meta property="og:image" content={ogImage.src} />
        </Head>

        <BlogCategorySelect
          categories={categories}
          currentCategorySlug={currentCategorySlug}
          className="page-padding mb-6"
        />

        <div className="page-padding flex min-h-[40vh] items-center justify-center">
          <p className="text-muted-foreground">
            {currentCategorySlug
              ? 'No posts in this category yet.'
              : 'No posts yet.'}
          </p>
        </div>
      </div>
    )

  return (
    <div>
      <Head>
        <title>Blog | Gavin Grant Consulting</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Gavin Grant" />
        <meta property="og:site_name" content="Gavin Grant Consulting" />
        <meta property="og:title" content="Blog" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage.src} />
      </Head>

      <BlogCategorySelect
        categories={categories}
        currentCategorySlug={currentCategorySlug}
        className="page-padding flex items-center justify-end"
      />

      <div className="page-padding-no-top grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 2xl:max-w-[1536px] 2xl:grid-cols-3">
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
    </div>
  )
}

export async function getServerSideProps(context) {
  const client = getClient()
  const postsPerPage = 12
  const categorySlug =
    typeof context.query.category === 'string' && context.query.category.length
      ? context.query.category
      : null

  const postsQuery = categorySlug ? BLOG_POSTS_BY_CATEGORY_QUERY : BLOG_POSTS_QUERY
  const countQuery = categorySlug
    ? BLOG_POST_COUNT_BY_CATEGORY_QUERY
    : BLOG_POST_COUNT_QUERY
  const countParams = categorySlug ? { categorySlug } : {}

  const [initialBlogPosts, totalPostCount, categories] = await Promise.all([
    client.fetch(postsQuery, {
      start: 0,
      end: postsPerPage - 1,
      ...(categorySlug && { categorySlug }),
    }),
    client.fetch(countQuery, countParams),
    client.fetch(BLOG_CATEGORIES_QUERY),
  ])

  return {
    props: {
      initialBlogPosts,
      totalPostCount,
      categories: categories ?? [],
      currentCategorySlug: categorySlug,
    },
  }
}
