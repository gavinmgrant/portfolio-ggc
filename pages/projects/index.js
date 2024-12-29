import React from 'react'
import Head from 'next/head'
import Loader from '../../components/Loader'
import ProjectCard from '../../components/ProjectCard'
import sanity from '../../lib/sanity'
import ogImage from '../../public/images/gavin-grant-og.png'
import { getSanityImageUrl } from '../../utils/getSanityImageUrl'

export default function Projects({ projects }) {
  if (!projects.length)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    )

  const description =
    'Explore projects designed and developed by front-end engineer Gavin Grant, featuring innovative web solutions built with Vue.js, React, and modern tech.'
  return (
    <div>
      <Head>
        <title>Gavin Grant Consulting | Projects</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Gavin Grant" />
        <meta property="og:title" content="Projects" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage.src} />
        <link rel="icon" href="/icon.png" />
      </Head>

      <div className="container mx-auto grid grid-cols-1 gap-x-6 gap-y-14 px-4 pt-20 lg:max-w-6xl lg:grid-cols-2 lg:pt-24">
        {projects.map((project, index) => {
          return (
            <ProjectCard
              index={index}
              key={project.slug}
              slug={project.slug}
              imgsrc={getSanityImageUrl(project.projectImages[0].asset._ref)}
              name={project.name}
              description={project.description}
            />
          )
        })}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const projects = await sanity.fetch(
    `*[_type == "project"] | order(order asc)`
  )

  return {
    props: {
      projects,
    },
  }
}
