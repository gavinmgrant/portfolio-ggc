import React, { useState } from 'react'
import Head from 'next/head'
import Loader from '../../components/Loader'
import ProjectCard from '../../components/ProjectCard'
import { getClient } from '../../lib/sanity'
import { PROJECTS_QUERY, PROJECT_COUNT_QUERY } from '../../lib/queries'
import ogImage from '../../public/images/gavin-grant-og.png'
import { getSanityImageUrl } from '../../utils/getSanityImageUrl'
import { Button } from '@heroui/react'

export default function Projects({ initialProjects, projectsCount }) {
  const [projects, setProjects] = useState(initialProjects)
  const [isLoading, setIsLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 9
  const hasMoreProjects = projects.length < projectsCount

  const loadMoreProjects = async () => {
    if (isLoading) return

    setIsLoading(true)
    const start = currentPage * projectsPerPage
    const end = start + projectsPerPage - 1

    try {
      const response = await fetch(`/api/projects?start=${start}&end=${end}`)
      const newProjects = await response.json()

      setProjects([...projects, ...newProjects])
      setCurrentPage(currentPage + 1)
    } catch (error) {
      console.error('Error loading more projects:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const description =
    'Explore projects designed and developed by front-end engineer Gavin Grant, featuring innovative web solutions built with Vue.js, React, and modern tech.'

  if (!projects.length)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    )

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

      <div className="page-padding grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 2xl:max-w-[1536px] 2xl:grid-cols-3">
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

      {hasMoreProjects && (
        <div className="mb-10 mt-4 flex items-center justify-center">
          <Button
            color="primary"
            radius="sm"
            size="lg"
            onPress={loadMoreProjects}
            disabled={isLoading}
            isLoading={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More Projects'}
          </Button>
        </div>
      )}
    </div>
  )
}

export async function getStaticProps() {
  const client = getClient()
  const projectsPerPage = 9

  const initialProjects = await client.fetch(PROJECTS_QUERY, {
    start: 0,
    end: projectsPerPage - 1,
  })

  const projectsCount = await client.fetch(PROJECT_COUNT_QUERY)

  return {
    props: {
      initialProjects,
      projectsCount,
    },
    revalidate: 300, // Revalidate every 5 minutes
  }
}
