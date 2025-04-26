import dynamic from 'next/dynamic'
import Head from 'next/head'
import BlogPost from '../../components/BlogPost'
import { getClient } from '../../lib/sanity'
import { token } from '../../lib/token'
import { BLOG_POSTS_SLUG_QUERY, BLOG_POST_QUERY } from '../../lib/queries'
import { getSanityImageUrl } from '../../utils/getSanityImageUrl'

const BlogPostPreview = dynamic(() =>
  import('../../components/BlogPostPreview')
)

export default function BlogPostPage({ post, params, draftMode }) {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  const pageTitle = `${post.metadata.title} | Gavin Grant Consulting`
  const postUrl = `${SITE_URL}/blog/${post.metadata.slug.current}`
  const postPublishDate = new Date(post.publishDate).toISOString()

  return (
    <div className="mx-auto flex items-start justify-center px-4 pt-[72px] sm:px-6 sm:pt-[80px] lg:pt-[88px] 2xl:max-w-[1536px]">
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={post.metadata.description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content={post.authors[0].name} />
        <meta property="article:published_time" content={postPublishDate} />
        <meta
          name="publish_date"
          property="og:publish_date"
          content={postPublishDate}
        />
        <meta property="og:site_name" content="Gavin Grant Consulting" />
        <meta property="og:title" content={post.metadata.title} />
        <meta property="og:description" content={post.metadata.description} />
        <meta
          property="og:image"
          content={getSanityImageUrl(post.metadata.image.asset._ref)}
        />
        <meta property="og:url" content={postUrl} />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.metadata.title} />
        <meta name="twitter:description" content={post.metadata.description} />
        <meta
          name="twitter:image"
          content={getSanityImageUrl(post.metadata.image.asset._ref)}
        />
      </Head>
      {draftMode ? (
        <BlogPostPreview post={post} params={params} />
      ) : (
        <BlogPost post={post} />
      )}
    </div>
  )
}

export const getStaticPaths = async () => {
  const client = getClient()
  // Get the paths we want to pre-render based on projects
  const blogPosts = await client.fetch(BLOG_POSTS_SLUG_QUERY)
  const paths = blogPosts.map((post) => ({
    params: { slug: post.slug },
  }))
  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This function gets called at build time on server-side.
export const getStaticProps = async ({ params = {}, draftMode = false }) => {
  const client = getClient(draftMode ? token : undefined)
  const post = await client.fetch(BLOG_POST_QUERY, { slug: params.slug })
  return { props: { post, params, draftMode, token: draftMode ? token : '' } }
}
