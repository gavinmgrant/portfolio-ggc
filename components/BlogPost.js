'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { AnimatePresence, motion } from 'motion/react'
import { PortableText } from '@portabletext/react'
import { useScrollHeight } from '../hooks/useScrollHeight'
import Author from '../components/Author'
import ShareButtons from '../components/ShareButtons'
import Loader from '../components/Loader'
import ContactForm from '../components/ContactForm'
import TableOfContents from './TableOfContents'
import { getSanityImageUrl } from '../utils/getSanityImageUrl'
import { parseChildrenToSlug } from '../utils/handleSlugs'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import {
  materialDark,
  materialLight,
} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import imageUrlBuilder from '@sanity/image-url'
import { getDisplayDate } from '../utils/getDisplayDate'

export default function BlogPost({ post }) {
  const [components, setComponents] = useState(null)
  const scrollHeight = useScrollHeight()
  const { theme } = useTheme()

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  const urlBuilder = imageUrlBuilder({ projectId, dataset })

  useEffect(() => {
    const components = {
      block: {
        normal: ({ children }) => <p>{children}</p>,
        h2: ({ children, value }) => {
          const slug = parseChildrenToSlug(value.children)
          return (
            <h2 id={slug} className="scroll-m-[104px] first:mt-0">
              {children}
            </h2>
          )
        },
      },
      types: {
        image: ({ value }) => {
          return (
            <Image
              className="my-6 overflow-hidden rounded-xl"
              alt={value.alt}
              src={urlBuilder.image(value).url()}
              width={1024}
              height={512}
            />
          )
        },
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
    setComponents(components)
  }, [theme])

  if (!post || !components)
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader />
      </div>
    )

  const displayDate = getDisplayDate(post.publishDate)
  const postTitle = post.metadata.title

  return (
    <div className="mb-6 flex items-start justify-between gap-4 sm:my-6 lg:max-w-[1148px] lg:items-center">
      <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-[auto_300px]">
        {/* Main Content */}
        <div className="lg:light-border pr-0 lg:max-w-[800px] lg:pr-6 xl:border-r-[0.5px]">
          <h1 className="heading-size-lg mb-5 font-semibold">
            {post.metadata.title}
          </h1>

          <div className="flex items-center justify-between text-sm opacity-70 lg:text-base">
            <time dateTime={post.publishDate} className="text-sm">
              {displayDate}
            </time>
            <p className="light-border rounded-full border px-3 py-1 text-sm">
              {post.estimatedReadingTime} min read
            </p>
          </div>

          <div className="my-6 flex items-center justify-between xl:hidden">
            <Author
              photoUrl={getSanityImageUrl(post.authors[0].image.asset._ref)}
              name={post.authors[0].name}
            />
            <ShareButtons postTitle={postTitle} postUrl={postUrl} />
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

          <div className="mt-8 lg:mt-0">
            <ContactForm />
          </div>
        </div>

        {/* Sidebar */}
        <aside className="hidden h-full w-full text-center xl:block xl:w-[300px] xl:text-left">
          <div className="overflow-y-auto xl:sticky xl:top-[104px]">
            <AnimatePresence>
              {scrollHeight > 240 && (
                <motion.h2
                  className="text-lg"
                  initial={{ y: -180, height: 0 }}
                  animate={{ y: 0, height: 'auto' }}
                  exit={{ y: -180, height: 0 }}
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

            <div className="light-border flex items-center justify-between border-b-[0.5px] py-6">
              <Author
                photoUrl={getSanityImageUrl(post.authors[0].image.asset._ref)}
                name={post.authors[0].name}
              />
              <ShareButtons postTitle={postTitle} postUrl={postUrl} />
            </div>

            {/* {post.categories?.length > 0 && (
                <div className="light-border border-b-[0.5px] pb-4 pt-4">
                  <div className="space-y-3">
                    {post.categories.map((category, index) => (
                      <p key={index} className="text-sm">
                        {category.title}
                      </p>
                    ))}
                  </div>
                </div>
              )} */}

            <div className="mt-6">
              <TableOfContents richText={post.body} />
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
