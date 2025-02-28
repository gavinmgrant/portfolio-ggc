import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion } from 'motion/react'
import { PortableText } from '@portabletext/react'
import { useScrollHeight } from '../../hooks/useScrollHeight'
import Author from '../../components/Author'
import Loader from '../../components/Loader'
import sanity from '../../lib/sanity'
import { getSanityImageUrl } from '../../utils/getSanityImageUrl'
import { getDisplayDate } from '../../utils/getDisplayDate'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  materialDark,
  materialLight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism'

export default function BlogPost({ post }) {
  const scrollHeight = useScrollHeight()
  const { theme } = useTheme()

  const components = {
    types: {
      code: ({ value }) => {
        return (
          <SyntaxHighlighter
            language={value.language || 'javascript'}
            style={theme === 'dark' ? materialDark : materialLight}
          >
            {value.code}
          </SyntaxHighlighter>
        )
      },
    },
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  if (!post)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    )

  const pageTitle = `${post.metadata.title} | Gavin Grant Consulting`
  const displayDate = getDisplayDate(post.publishDate)

  return (
    <div className="mx-auto flex items-start justify-center px-4 pt-[72px] sm:px-6 sm:pt-[80px] 2xl:max-w-[1536px]">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={post.metadata.description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content={post.authors[0].name} />
        <meta
          name="publish_date"
          property="og:publish_date"
          content={post.publishDate}
        />
        <meta property="og:title" content={post.metadata.title} />
        <meta property="og:description" content={post.metadata.description} />
        <meta
          property="og:image"
          content={getSanityImageUrl(post.metadata.image.asset._ref)}
        />
      </Head>

      <div className="mb-6 flex items-start justify-between gap-4 sm:my-6 lg:max-w-[1148px] lg:items-center">
        <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-[auto_300px]">
          {/* Main Content */}
          <div className="lg:light-border pr-0 lg:max-w-[800px] xl:border-r-[0.5px] lg:pr-6">
            <h1 className="heading-size-lg mb-5 font-semibold">
              {post.metadata.title}
            </h1>

            <div className="flex items-center justify-between text-sm opacity-70 lg:text-base">
              <time dateTime={post.publishDate}>{displayDate}</time>
              <p className="light-border rounded-full border px-3 py-0">
                {post.estimatedReadingTime} min read
              </p>
            </div>

            <div className="my-6 block xl:hidden">
              <Author
                photoUrl={getSanityImageUrl(post.authors[0].image.asset._ref)}
                name={post.authors[0].name}
              />
            </div>

            <Image
              className="my-6 aspect-video overflow-hidden rounded-xl object-cover"
              alt={post.metadata.title}
              src={getSanityImageUrl(post.metadata.image.asset._ref)}
              width={1024}
              height={512}
              priority={true}
            />

            <article className="prose mt-6 w-full dark:prose-invert">
              <PortableText value={post.body} components={components} />
            </article>
          </div>

          {/* Sidebar */}
          <div className="hidden h-full w-full text-center xl:block xl:w-[300px] xl:text-left">
            <div className="xl:sticky xl:top-[104px]">
              <AnimatePresence>
                {scrollHeight > 240 && (
                  <motion.h2
                    className="pb-5 text-lg"
                    initial={{ y: -180 }}
                    animate={{ y: 0 }}
                    exit={{ y: -180 }}
                    transition={{
                      type: 'spring',
                      stiffness: 320,
                      damping: 32,
                    }}
                  >
                    {post.metadata.title}
                  </motion.h2>
                )}
              </AnimatePresence>

              <div className="light-border border-b-[0.5px] pb-6">
                <Author
                  photoUrl={getSanityImageUrl(post.authors[0].image.asset._ref)}
                  name={post.authors[0].name}
                />
              </div>

              {post.categories?.length > 0 && (
                <div className='pt-4'>
                  {post.categories.map((category, index) => (
                    <p key={index} className="text-sm">
                      {category.title}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const blogPostsQuery = `*[_type == "blog.post"] { "slug": metadata.slug.current }`
const postQuery = `*[_type == "blog.post" && metadata.slug.current == $slug][0]{
  metadata{
    title,
    description,
    slug,
    image
  },
  body,
  publishDate,
  categories[]->{
    title,
    slug
  },
  authors[]->{
    name,
    image
  },
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
}`

export const getStaticPaths = async () => {
  // Get the paths we want to pre-render based on projects
  const blogPosts = await sanity.fetch(blogPostsQuery)
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params }) => {
  const post = await sanity.fetch(postQuery, { slug: params.slug })
  return { props: { post } }
}
