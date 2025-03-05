import dynamic from "next/dynamic";
import BlogPost from '../../components/BlogPost'
import { getClient } from '../../lib/sanity'
import { token } from '../../lib/token'
import { BLOG_POSTS_SLUG_QUERY, BLOG_POST_QUERY } from '../../lib/queries'

const BlogPostPreview = dynamic(() =>
  import('../../components/BlogPostPreview')
)

export default function BlogPostPage({ post, params, draftMode }) {
  return draftMode ? (
    <BlogPostPreview post={post} params={params} />
  ) : (
    <BlogPost post={post} />
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
