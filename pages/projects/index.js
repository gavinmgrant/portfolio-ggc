import React from 'react'
import Head from 'next/head'
import Loader from '../../components/Loader'
import ProjectCard from '../../components/ProjectCard'
import { getClient } from '../../lib/sanity'
import { PROJECTS_QUERY } from '../../lib/queries'
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
        <title>Projects | Gavin Grant Consulting</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Gavin Grant" />
        <meta property="og:site_name" content="Gavin Grant Consulting" />
        <meta property="og:title" content="Projects" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage.src} />
      </Head>

      <div className="mx-auto grid grid-cols-1 gap-4 px-4 pb-4 pt-[72px] sm:gap-6 sm:px-6 sm:pb-6 sm:pt-[104px] md:grid-cols-2 2xl:max-w-[1536px] 2xl:grid-cols-3">
        {projects.map((project, index) => {
          return (
            <ProjectCard
              index={index}
              key={project.slug}
              slug={project.slug}
              imgsrc={getSanityImageUrl(project.projectImages[0].asset._ref)}
              name={project.name}
              description={project.description}
              type="projects"
            />
          )
        })}
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const client = getClient()
  const projects = await client.fetch(PROJECTS_QUERY)

  return {
    props: {
      projects,
    },
  }
}
