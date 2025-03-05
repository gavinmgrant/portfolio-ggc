import { QueryParams, SanityDocument } from 'next-sanity'
import { useLiveQuery } from 'next-sanity/preview'
import { BLOG_POST_QUERY } from '../lib/queries'
import BlogPost from './BlogPost'

export default function BlogPostPreview({
  post,
  params = {},
}: {
  post: SanityDocument
  params: QueryParams
}) {
  const [data] = useLiveQuery<SanityDocument>(post, BLOG_POST_QUERY, params)

  return <BlogPost post={data} />
}
