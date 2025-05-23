import { useEffect } from 'react'
import Head from 'next/head'
import Loader from '../../components/Loader'
import Carousel from '../../components/Carousel'
import {
  IconExternalLink,
  IconBrandGithub,
  IconAlertTriangle,
  IconEyeOff,
} from '@tabler/icons-react'
import { motion } from 'motion/react'
import { Button } from '@heroui/react'
import { getClient } from '../../lib/sanity'
import {
  PROJECTS_SLUG_QUERY,
  PROJECT_QUERY,
  TECHNOLOGIES_QUERY,
} from '../../lib/queries'
import { token } from '../../lib/token'
import { getSanityImageUrl } from '../../utils/getSanityImageUrl'

export default function ProjectPage({ project, technologies }) {
  const proj = project[0]

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const technologiesUsed = technologies.filter((tech) => {
    return proj.technologies?.some((t) => t._ref === tech._id)
  })

  if (!proj)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    )

  const pageTitle = `${proj.isArray ? '' : proj.name} | Gavin Grant Consulting`

  return (
    <div className="mx-auto px-4 pt-[72px] sm:px-6 sm:pt-[104px] lg:pt-[112px] 2xl:max-w-[1536px]">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={proj.description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Gavin Grant" />
        <meta property="og:site_name" content="Gavin Grant Consulting" />
        <meta property="og:title" content={proj.name} />
        <meta property="og:description" content={proj.description} />
        <meta
          property="og:image"
          content={getSanityImageUrl(proj.projectImages[0].asset._ref)}
        />
        <meta property="og:url" content={proj.url} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={proj.name} />
        <meta name="twitter:description" content={proj.description} />
        <meta
          name="twitter:image"
          content={getSanityImageUrl(proj.projectImages[0].asset._ref)}
        />
      </Head>

      <section className="flex flex-col justify-start gap-4 lg:flex-row lg:justify-between lg:gap-20 xl:gap-24">
        <Carousel
          sanityImages={proj.projectImages}
          projectUrl={proj.url}
          projectName={proj.name}
        />

        <div className="mt-10 flex shrink-0 flex-row flex-wrap lg:mt-1 lg:flex-col lg:items-end">
          {technologiesUsed.map((tech, i) => {
            return (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1 }}
                className="mb-4 mr-2 mt-0 lg:mr-0"
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

      <div className="my-4 flex items-center justify-between gap-4 lg:mb-6 lg:mt-14">
        <div className="flex flex-col items-start justify-start gap-4 lg:flex-row lg:items-center lg:gap-5">
          <a href={proj.url} target="_blank" className="hover-color">
            <h1 className="heading-size-lg font-semibold">{proj.name}</h1>
          </a>
          {proj.inactive && (
            <div className="flex items-center gap-2 rounded-lg bg-amber-700 px-2 py-0.5 text-white md:px-3.5 md:py-1.5">
              <IconAlertTriangle size="24px" className="shrink-0" />
              <p className="text-sm">{proj.inactiveMessage}</p>
            </div>
          )}
        </div>
        <motion.a
          href={proj.url}
          target="_blank"
          whileHover={{ scale: 1.1 }}
          className="hover-color flex items-center gap-2"
        >
          <p className="hidden text-sm sm:block lg:text-base">View project</p>{' '}
          <IconExternalLink size="32px" />
        </motion.a>
      </div>
      <p className="mb-4 text-sm lg:text-base">{proj.description}</p>
      <ul className="list-disc">
        {proj.bullets?.map((bullet, i) => {
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
        {proj.github ? (
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <a href={proj.github} target="_blank">
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

export const getStaticPaths = async () => {
  const client = getClient()
  // Get the paths we want to pre-render based on projects
  const projects = await client.fetch(PROJECTS_SLUG_QUERY)
  const paths = projects.map((project) => ({
    params: { slug: project.slug },
  }))

  // New pages wait (block) server-side until ready, then render full page.
  return { paths, fallback: 'blocking' }
}

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params, draftMode = false }) => {
  const client = getClient(draftMode ? token : undefined)
  const project = await client.fetch(PROJECT_QUERY, { slug: params.slug })
  const technologies = await client.fetch(TECHNOLOGIES_QUERY)
  return {
    props: {
      project,
      technologies,
      draftMode,
      token: draftMode ? token : '',
    },
    revalidate: 300, // Revalidate every 5 minutes
  }
}
