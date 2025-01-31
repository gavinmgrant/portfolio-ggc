import { useState, useLayoutEffect } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Loader from '../../components/Loader'
import Carousel from '../../components/Carousel'
import {
  IconExternalLink,
  IconBrandGithub,
  IconAlertTriangle,
  IconEyeOff,
} from '@tabler/icons'
import { motion } from 'framer-motion'
import { Button } from '@heroui/react'
import sanity from '../../lib/sanity'
import { getSanityImageUrl } from '../../utils/getSanityImageUrl'

export default function Project({ project, technologies }) {
  const p = project[0]

  const technologiesUsed = technologies.filter((tech) => {
    return p.technologies?.some((t) => t._ref === tech._id)
  })

  const [isLoaded, setIsLoaded] = useState(false)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

  const pageTitle = `${p.isArray ? '' : p.name} | Gavin Grant Consulting`

  return (
    <div className="side-borders mx-auto px-4 pt-[72px] sm:px-6 sm:pt-[104px] 2xl:max-w-[1536px]">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={p.description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Gavin Grant" />
        <meta property="og:title" content={p.name} />
        <meta property="og:description" content={p.description} />
        <meta
          property="og:image"
          content={getSanityImageUrl(p.projectImages[0].asset._ref)}
        />
      </Head>

      <section className="flex flex-col justify-start gap-4 lg:flex-row lg:gap-6">
        {!!p.projectImages ? (
          <Carousel
            sanityImages={p.projectImages}
            projectUrl={p.url}
            projectName={p.name}
          />
        ) : (
          <a href={p.url} target="_blank" className="grow">
            <motion.div
              initial="hidden"
              animate={isLoaded ? 'visible' : 'hidden'}
            >
              <motion.div
                className="light-border overflow-hidden rounded-xl border-[0.5px]"
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
                    className={`cursor-pointer overflow-hidden rounded-xl transition-all duration-300 ease-in-out hover:scale-105 ${
                      !isLoaded && 'animate-pulse'
                    }`}
                    onLoad={() => setIsLoaded(true)}
                    priority={true}
                  />
                )}
              </motion.div>
            </motion.div>
          </a>
        )}

        <div className="mt-10 flex shrink-0 flex-row flex-wrap lg:mt-0 lg:flex-col">
          {technologiesUsed.map((tech, i) => {
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="mb-4 mr-2 mt-0 "
              >
                <motion.a
                  href={tech.url}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 + i * 0.25 }}
                  viewport={{ once: true }}
                  className="rounded bg-neutral-100 px-3 py-2 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-300 lg:text-sm"
                >
                  {tech.description?.split(' - ')[0]}
                </motion.a>
              </motion.div>
            )
          })}
        </div>
      </section>

      <div className="my-4 flex items-start justify-between gap-4 lg:mb-4 lg:mt-12 lg:items-center">
        <div className="flex flex-col items-start justify-start gap-4 lg:flex-row lg:items-center lg:gap-5">
          <a
            href={p.url}
            target="_blank"
            className="transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
          >
            <h1 className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
              {p.name}
            </h1>
          </a>
          {p.inactive && (
            <div className="flex items-center gap-2 rounded-lg bg-amber-700 px-2 py-0.5 text-white md:px-3.5 md:py-1.5">
              <IconAlertTriangle size="24px" className="shrink-0" />
              <p className="text-sm">{p.inactiveMessage}</p>
            </div>
          )}
        </div>
        <motion.a
          href={p.url}
          target="_blank"
          whileHover={{ scale: 1.1 }}
          className="transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
        >
          <IconExternalLink size="32px" />
        </motion.a>
      </div>
      <p className="mb-4 text-sm lg:text-base">{p.description}</p>
      <ul className="list-disc">
        {p.bullets?.map((bullet, i) => {
          return (
            <li key={i} className="ml-6 text-sm lg:text-base">
              {bullet}
            </li>
          )
        })}
      </ul>

      <h3 className="mb-2 mt-6 text-2xl">Technology</h3>
      <ul className="list-disc">
        {technologiesUsed.map((tech, i) => {
          return (
            <li key={i} className="ml-6 text-sm lg:text-base">
              {tech.description}
            </li>
          )
        })}
      </ul>
      <div className="flex w-full items-center justify-center py-8">
        {p.github ? (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href={p.github} target="_blank">
              <Button
                className="flex items-center gap-3"
                size="lg"
                color="primary"
              >
                <IconBrandGithub size="24px" />
                <span>GitHub Repo</span>
              </Button>
            </a>
          </motion.div>
        ) : (
          <Button
            disabled={true}
            size="lg"
            className="flex cursor-not-allowed items-center gap-3"
          >
            <IconEyeOff size="24px" />
            <span>Private GitHub Repo</span>
          </Button>
        )}
      </div>
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
