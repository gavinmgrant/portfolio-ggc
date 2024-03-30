import { useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Loader from '../../components/Loader'
import { IconExternalLink } from '@tabler/icons'
import { motion } from 'framer-motion'
import sanity from '../../lib/sanity'

export default function Project({ project, technologies }) {
  const p = project[0]
  const technologiesUsed = technologies.filter((tech) => {
    return p.technologies?.some((t) => t._ref === tech._id)
  })

  const [isLoaded, setIsLoaded] = useState(false)

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  }

  if (!p)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    )

  return (
    <div className="container mx-auto px-4 pt-16 lg:max-w-6xl lg:pt-24">
      <Head>
        <title>Gavin Grant Consulting | {p.name}</title>
        <meta name="description" content={p.description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content={p.name} />
        <meta property="og:description" content={p.description} />
        <meta property="og:image" content={p.imgsrc} />
        <link rel="icon" href="/icon.png" />
      </Head>
      <section className="flex flex-col justify-start lg:flex-row lg:justify-between">
        <a href={p.url} target="_blank" className="grow">
          <motion.div
            initial="hidden"
            animate={isLoaded ? 'visible' : 'hidden'}
          >
            <motion.div
              className="overflow-hidden rounded-md shadow-lg shadow-neutral-300 dark:shadow-neutral-700"
              style={{
                position: 'relative',
                maxWidth: '800px',
                maxHeight: '534px',
              }}
              variants={variants}
            >
              {p.imgsrc && (
                <Image
                  alt={p.name}
                  src={p.imgsrc}
                  width={800}
                  height={534}
                  quality={100}
                  className={`cursor-pointer overflow-hidden rounded-md transition-all duration-300 ease-in-out hover:scale-105 ${
                    !isLoaded && 'animate-pulse'
                  }`}
                  onLoad={() => setIsLoaded(true)}
                  priority={true}
                />
              )}
            </motion.div>
          </motion.div>
        </a>
        <div className="mt-6 flex flex-row flex-wrap lg:mt-0 lg:flex-col">
          {technologiesUsed.map((tech, i) => {
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="mr-2 mt-0 mb-3 "
              >
                <motion.a
                  href={tech.url}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 + i * 0.25 }}
                  viewport={{ once: true }}
                  className="rounded bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300 lg:text-sm"
                >
                  {tech.description?.split(' - ')[0]}
                </motion.a>
              </motion.div>
            )
          })}
        </div>
      </section>
      <div className="my-4 flex items-center justify-between lg:my-8">
        <h1 className="text-3xl font-semibold lg:text-4xl">{p.name}</h1>
        <motion.a
          href={p.url}
          target="_blank"
          whileHover={{ scale: 1.1 }}
          className="transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
        >
          <IconExternalLink size="32px" />
        </motion.a>
      </div>
      <p className="mb-4">{p.description}</p>
      <ul className="list-disc">
        {p.bullets?.map((bullet, i) => {
          return (
            <li key={i} className="ml-6">
              {bullet}
            </li>
          )
        })}
      </ul>

      <h3 className="mt-6 mb-2 text-2xl">Technology</h3>
      <ul className="list-disc">
        {technologiesUsed.map((tech, i) => {
          return (
            <li key={i} className="ml-6">
              {tech.description}
            </li>
          )
        })}
      </ul>
      {p.github && (
        <div className="flex w-full items-center justify-center">
          <motion.button
            className="btn-primary mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href={p.github} target="_blank">
              GitHub Repo
            </a>
          </motion.button>
        </div>
      )}
    </div>
  )
}

const projectsQuery = `*[_type == "project"] { slug }`
const singleProjectQuery = `*[_type == "project" && slug == $slug]`
const technologiesQuery = `*[_type == "technology"]`

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on projects
  const projects = await sanity.fetch(projectsQuery)
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params }) => {
  const project = await sanity.fetch(singleProjectQuery, { slug: params.slug })
  const technologies = await sanity.fetch(technologiesQuery)
  return { props: { project, technologies } }
}
