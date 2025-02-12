import React from 'react'
import Head from 'next/head'
import Loader from '../../components/Loader'
import ProjectCard from '../../components/ProjectCard'
import sanity from '../../lib/sanity'
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
    'Blog posts written by front-end engineer Gavin Grant, sharing insights and experiences in web development, Vue.js, React, and modern technologies.'

  return (
    <div>
      <Head>
        <title>Blog | Gavin Grant Consulting</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Gavin Grant" />
        <meta property="og:title" content="Blog" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage.src} />
      </Head>

      <div className="mx-auto grid grid-cols-1 gap-4 px-4 pb-4 pt-[72px] sm:gap-6 sm:px-6 sm:pb-6 sm:pt-[104px] md:grid-cols-2 2xl:max-w-[1536px] 2xl:grid-cols-3">
        {blogPosts.map((post, index) => {
          return (
            <ProjectCard
              index={index}
              key={post.slug}
              slug={post.slug}
              imgsrc={getSanityImageUrl(post.projectImages[0].asset._ref)}
              name={post.title}
              description={post.description}
            />
          )
        })}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const blogPosts = await sanity.fetch(`*[_type == "blog"] | order(order asc)`)

  return {
    props: {
      blogPosts,
    },
  }
}
