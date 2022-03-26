import React from 'react'
import useSWR from 'swr'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Projects() {
  const { data, error } = useSWR('/api/projects', fetcher)

  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Failed to load projects.</p>
      </div>
    )
  if (!data)
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading projects...</p>
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

      <main className="container mx-auto pt-20 lg:pt-24 grid grid-cols-1 gap-x-6 gap-y-14 px-4 lg:max-w-6xl lg:grid-cols-2">
        {data.map((project) => {
          return (
            <Link
              key={project.slug}
              href={`/projects/${encodeURIComponent(project.slug)}`}
            >
              <div key={project.slug}>
                <div
                  className="overflow-hidden rounded-md shadow-lg"
                  style={{ position: 'relative', maxWidth: '600px', maxHeight: '400px' }}
                >
                  <Image
                    alt={project.title}
                    src={project.imgsrc}
                    width={600}
                    height={400}
                    layout="responsive"
                    className="cursor-pointer overflow-hidden rounded-md transition-all duration-300 ease-in-out hover:scale-105"
                  />
                </div>
                <div className="cursor-pointer">
                  <h2 className="my-4 text-2xl font-semibold">{project.name}</h2>
                  <p>{project.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </main>
    </div>
  )
}
