import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import useSWR from 'swr'
import Head from 'next/head'
import { LinkIcon } from '../../public/LinkIcon'
import Loader from '../../components/Loader'

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
      <a href={data.url} target="_blank">
        <div
          className="overflow-hidden rounded-md shadow-lg"
          style={{
            position: 'relative',
            maxWidth: '800px',
            maxHeight: '534px',
          }}
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
        </div>
      </a>

      <div className="my-4 flex items-center justify-between lg:my-8">
        <h1 className="text-3xl font-semibold lg:text-4xl">{data.name}</h1>
        <a href={data.url} target="_blank">
          <LinkIcon />
        </a>
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
              {tech}
            </li>
          )
        })}
      </ul>
      {data.github !== null && (
        <div className="flex w-full items-center justify-center">
          <button className="btn-primary mt-6">
            <a href={data.github} target="_blank">
              GitHub Repo
            </a>
          </button>
        </div>
      )}
    </div>
  )
}
