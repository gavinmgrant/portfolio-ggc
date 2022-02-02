import { useRouter } from 'next/router'
import Image from 'next/image'
import useSWR from 'swr'
import Head from 'next/head'
import Link from 'next/link'
import { LinkIcon } from '../../public/LinkIcon'

const fetcher = async (url) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

export default function Projects() {
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.slug && `/api/projects/${query.slug}`,
    fetcher
  )

  if (error)
    return (
      <div className="flex items-center justify-center">
        <p>{error.message}</p>
      </div>
    )
  if (!data)
    return (
      <div className="flex items-center justify-center">
        <p>Loading project...</p>
      </div>
    )

  return (
    <div className="container mx-auto px-4 lg:max-w-6xl">
      <Head>
        <title>Gavin Grant Consulting | {data.name}</title>
        <meta name="description" content={data.description} />
      </Head>

      <div
        className="mb-2 overflow-hidden rounded-md shadow-lg"
        style={{ position: 'relative', maxWidth: '800px', maxHeight: '534px' }}
      >
        <Link href={data.url}>
          <Image
            src={data.imgsrc}
            alt="Screenshot"
            width={800}
            height={534}
            quality={100}
            className="cursor-pointer overflow-hidden rounded-md transition-all duration-300 ease-in-out hover:scale-105"
          />
        </Link>
      </div>

      <div className="flex justify-between">
        <h1 className="my-2 text-2xl md:text-3xl lg:text-4xl font-bold">{data.name}</h1>
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
        <button className="btn-primary mt-6">
          <a href={data.github} target="_blank">
            GitHub Repo
          </a>
        </button>
      )}
    </div>
  )
}
