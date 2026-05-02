import BlogListing from '../../../components/BlogListing'
import { getClient } from '../../../lib/sanity'
import {
  BLOG_POSTS_BY_CATEGORY_QUERY,
  BLOG_POST_COUNT_BY_CATEGORY_QUERY,
  BLOG_CATEGORIES_QUERY,
} from '../../../lib/queries'

export default function BlogCategoryPage(props) {
  return <BlogListing {...props} />
}

export async function getStaticPaths() {
  const client = getClient()
  const categories = await client.fetch(BLOG_CATEGORIES_QUERY)
  const paths = (categories ?? []).map((cat) => ({
    params: { slug: cat.slug },
  }))

  return {
    paths,
    fallback: 'blocking',
  }
}

export async function getStaticProps({ params }) {
  const slug =
    typeof params?.slug === 'string' && params.slug.length ? params.slug : null
  if (!slug) {
    return { notFound: true }
  }

  const client = getClient()
  const postsPerPage = 12

  const categories = await client.fetch(BLOG_CATEGORIES_QUERY)
  const category = (categories ?? []).find((c) => c.slug === slug)

  if (!category) {
    return { notFound: true }
  }

  const [initialBlogPosts, totalPostCount] = await Promise.all([
    client.fetch(BLOG_POSTS_BY_CATEGORY_QUERY, {
      start: 0,
      end: postsPerPage - 1,
      categorySlug: slug,
    }),
    client.fetch(BLOG_POST_COUNT_BY_CATEGORY_QUERY, { categorySlug: slug }),
  ])

  return {
    props: {
      initialBlogPosts,
      totalPostCount,
      categories: categories ?? [],
      currentCategorySlug: slug,
      categoryTitle: category.title,
    },
    revalidate: 300,
  }
}
