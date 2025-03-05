// Blog post queries
export const BLOG_POSTS_QUERY = `*[_type == "blog.post"]
  {
    publishDate,
    metadata,
    "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180 )
  } | order(publishDate desc)
`
export const BLOG_POSTS_SLUG_QUERY = `*[_type == "blog.post"] { "slug": metadata.slug.current }`
export const BLOG_POST_QUERY = `*[_type == "blog.post" && metadata.slug.current == $slug][0]{
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

// Project queries
export const PROJECTS_QUERY = `*[_type == "project"] | order(order asc)`
export const PROJECTS_SLUG_QUERY = `*[_type == "project"] { slug }`
export const PROJECT_QUERY = `*[_type == "project" && slug == $slug]`

// Technologies queries
export const TECHNOLOGIES_QUERY = `*[_type == "technology"] | order(description)`

// Sitemap queries
export const SITEMAP_PROJECTS_QUERY = `*[_type == "project"]{ slug }`
export const SITEMAP_BLOG_POSTS_QUERY = `*[_type == "blog.post"]{ "slug": metadata.slug.current, publishDate }`
