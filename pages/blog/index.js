import BlogListing from '../../components/BlogListing'
import { getClient } from '../../lib/sanity'
import {
  BLOG_POSTS_QUERY,
  BLOG_POST_COUNT_QUERY,
  BLOG_CATEGORIES_QUERY,
} from '../../lib/queries'

export default function Blog(props) {
  return <BlogListing {...props} />
}

export async function getStaticProps() {
  const client = getClient()
  const postsPerPage = 12

  const [initialBlogPosts, totalPostCount, categories] = await Promise.all([
    client.fetch(BLOG_POSTS_QUERY, {
      start: 0,
      end: postsPerPage - 1,
    }),
    client.fetch(BLOG_POST_COUNT_QUERY),
    client.fetch(BLOG_CATEGORIES_QUERY),
  ])

  return {
    props: {
      initialBlogPosts,
      totalPostCount,
      categories: categories ?? [],
      currentCategorySlug: null,
      categoryTitle: null,
    },
    revalidate: 300,
  }
}
