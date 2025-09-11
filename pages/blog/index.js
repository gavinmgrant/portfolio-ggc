import React, { useState } from 'react'
import Head from 'next/head'
import Loader from '../../components/Loader'
import ProjectCard from '../../components/ProjectCard'
import { getClient } from '../../lib/sanity'
import { BLOG_POSTS_QUERY, BLOG_POST_COUNT_QUERY } from '../../lib/queries'
import ogImage from '../../public/images/gavin-grant-og.png'
import { getSanityImageUrl } from '../../utils/getSanityImageUrl'
import { Button } from '@heroui/react'

export default function Blog({ initialBlogPosts, totalPostCount }) {
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 12
  const hasMorePosts = blogPosts.length < totalPostCount

  const loadMorePosts = async () => {
    if (isLoading) return

    setIsLoading(true)
    const start = currentPage * postsPerPage
    const end = start + postsPerPage - 1

    try {
      const response = await fetch(`/api/blog-posts?start=${start}&end=${end}`)
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

      <div className="page-padding grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 2xl:max-w-[1536px] 2xl:grid-cols-3">
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

export async function getStaticProps() {
  const client = getClient()
  const postsPerPage = 12

  const initialBlogPosts = await client.fetch(BLOG_POSTS_QUERY, {
    start: 0,
    end: postsPerPage - 1,
  })
  const totalPostCount = await client.fetch(BLOG_POST_COUNT_QUERY)

  return {
    props: {
      initialBlogPosts,
      totalPostCount,
    },
    revalidate: 300, // Revalidate every 5 minutes
  }
}
