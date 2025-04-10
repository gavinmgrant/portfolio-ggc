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

// Search queries
export const SEARCH_QUERY = `*[
  (_type == "blog.post" && (
    metadata.title match $query + "*" || 
    metadata.description match $query + "*"
  )) || 
  (_type == "project" && (
    name match $query + "*" || 
    description match $query + "*" ||
    bullets[] match $query + "*" ||
    technologies[]->description match $query + "*"
  ))
  ]{
  _type,
  "type": select(
    _type == "blog.post" => "blog",    
    _type == "project" => "projects"
  ),
  "title": select(_type == "blog.post" => metadata.title),
  "name": select(_type == "project" => name),
  "slug": select(_type == "blog.post" => metadata.slug.current, _type == "project" => slug),
  "description": select(_type == "blog.post" => metadata.description, _type == "project" => description),
  "image": select(_type == "blog.post" => metadata.image, _type == "project" => projectImages[0])
  }[0...20]`
