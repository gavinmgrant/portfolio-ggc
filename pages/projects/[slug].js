import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import useSWR from 'swr'
import Head from 'next/head'
import Loader from '../../components/Loader'
import { IconExternalLink } from '@tabler/icons'
import { motion } from 'framer-motion'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function Projects() {
  const [isLoaded, setIsLoaded] = useState(false)
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.slug && `/api/projects/${query.slug}`,
    fetcher
  )

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 300, damping: 24 },
    },
    hidden: { opacity: 0, y: 20, transition: { duration: 0.2 } },
  }

  if (error)
    return (
      <div className="flex h-screen items-center justify-center">
        <p>{error.message}</p>
      </div>
    )
  if (!data)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    )

  return (
    <div className="container mx-auto px-4 pt-16 lg:max-w-6xl lg:pt-24">
      <Head>
        <title>Gavin Grant Consulting | {data.name}</title>
        <meta name="description" content={data.description} />
      </Head>
      <section className="flex flex-col justify-start lg:flex-row lg:justify-between">
        <a href={data.url} target="_blank" className="grow">
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
              <Image
                alt={data.name}
                src={data.imgsrc}
                width={800}
                height={534}
                quality={100}
                layout="responsive"
                className={`cursor-pointer overflow-hidden rounded-md transition-all duration-300 ease-in-out hover:scale-105 ${
                  !isLoaded && 'animate-pulse'
                }`}
                onLoad={() => setIsLoaded(true)}
              />
            </motion.div>
          </motion.div>
        </a>
        <div className="mt-6 flex flex-row flex-wrap lg:mt-0 lg:flex-col">
          {data.technologies.map((tech, i) => {
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
                  {tech.description.split(' - ')[0]}
                </motion.a>
              </motion.div>
            )
          })}
        </div>
      </section>
      <div className="my-4 flex items-center justify-between lg:my-8">
        <h1 className="text-3xl font-semibold lg:text-4xl">{data.name}</h1>
        <motion.a
          href={data.url}
          target="_blank"
          whileHover={{ scale: 1.1 }}
          className="transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
        >
          <IconExternalLink size="32px" />
        </motion.a>
      </div>
      <p className="mb-4">{data.description}</p>
      <ul className="list-disc">
        {data.bullets.map((bullet, i) => {
          return (
            <li key={i} className="ml-6">
              {bullet}
            </li>
          )
        })}
      </ul>

      <h3 className="mt-6 mb-2 text-2xl">Technology</h3>
      <ul className="list-disc">
        {data.technologies.map((tech, i) => {
          return (
            <li key={i} className="ml-6">
              {tech.description}
            </li>
          )
        })}
      </ul>
      {data.github !== null && (
        <div className="flex w-full items-center justify-center">
          <motion.button
            className="btn-primary mt-6"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href={data.github} target="_blank">
              GitHub Repo
            </a>
          </motion.button>
        </div>
      )}
    </div>
  )
}
