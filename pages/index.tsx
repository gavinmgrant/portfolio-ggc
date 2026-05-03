import Head from 'next/head'
import type { InferGetStaticPropsType } from 'next'
import About from '../components/About'
import FeaturedBlogPosts from '../components/FeaturedBlogPosts'
import Testimonials from '../components/Testimonials'
import Divider from '../components/Divider'
import ContactForm from '../components/ContactForm'
import ogImage from '../public/images/gavin-grant-og.png'
import { getClient } from '../lib/sanity'
import { FEATURED_BLOG_POSTS_QUERY } from '../lib/queries'
import type { FeaturedBlogPostData } from '../components/FeaturedBlogPosts'

export async function getStaticProps() {
  try {
    const client = getClient()
    const featuredPosts = await client.fetch(FEATURED_BLOG_POSTS_QUERY)
    return {
      props: {
        featuredPosts: (Array.isArray(featuredPosts)
          ? featuredPosts
          : []) as FeaturedBlogPostData[],
      },
      revalidate: 60,
    }
  } catch (error) {
    console.error('Error fetching featured posts for homepage:', error)
    return {
      props: {
        featuredPosts: [] as FeaturedBlogPostData[],
      },
      revalidate: 60,
    }
  }
}

type HomeProps = InferGetStaticPropsType<typeof getStaticProps>

export default function Home({ featuredPosts }: HomeProps) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  const description =
    'Gavin Grant Consulting specializes in building fast, scalable websites and web applications that stand out.'

  return (
    <div>
      <Head>
        <title>Gavin Grant Consulting</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Gavin Grant" />
        <meta property="og:site_name" content="Gavin Grant Consulting" />
        <meta property="og:title" content="Gavin Grant Consulting" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage.src} />
        <link rel="canonical" href={SITE_URL} />
      </Head>
      <div className="mx-auto flex max-w-[1536px] flex-col items-center justify-center px-4 antialiased sm:px-6">
        <About />
        <Divider />
        <FeaturedBlogPosts posts={featuredPosts} />
        <Testimonials />
        <Divider />
        <div className="flex w-full items-center justify-center pb-8 lg:min-h-[calc(100vh-168px)] lg:pb-28">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
