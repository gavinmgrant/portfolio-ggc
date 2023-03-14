import React from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import Loader from '../../components/Loader'
import ProjectCard from '../../components/ProjectCard'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Projects() {
  const { data, error } = useSWR('/api/projects', fetcher)

  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Failed to load projects.</p>
      </div>
    )
  if (!data)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    )

  return (
    <div>
      <Head>
        <title>Gavin Grant Consulting | Projects</title>
        <meta name="description" content="Projects" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <div className="container mx-auto grid grid-cols-1 gap-x-6 gap-y-14 px-4 pt-20 lg:max-w-6xl lg:grid-cols-2 lg:pt-24">
        {data.map((project, index) => {
          return (
            <ProjectCard
              index={index}
              key={project.slug}
              slug={project.slug}
              imgsrc={project.imgsrc}
              name={project.name}
              description={project.description}
            />
          )
        })}
      </div>
    </div>
  )
}
