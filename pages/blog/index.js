import React from 'react'
import Head from 'next/head'
import Loader from '../../components/Loader'
import ProjectCard from '../../components/ProjectCard'
import { getClient } from '../../lib/sanity'
import { BLOG_POSTS_QUERY } from '../../lib/queries'
import ogImage from '../../public/images/gavin-grant-og.png'
import { getSanityImageUrl } from '../../utils/getSanityImageUrl'

export default function Blog({ blogPosts }) {
  if (!blogPosts.length)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    )

  const description =
    'Blog posts written by front-end engineer Gavin Grant, sharing insights and experiences in web development, Next.js, and modern technologies.'

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
    </div>
  )
}

export async function getStaticProps() {
  const client = getClient()
  const blogPosts = await client.fetch(BLOG_POSTS_QUERY)

  return {
    props: {
      blogPosts,
    },
  }
}
