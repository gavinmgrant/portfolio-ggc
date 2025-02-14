import sanity from '../../lib/sanity'

const baseUrl = 'https://www.gavingrant.com'

// Query to fetch project slugs from Sanity
const projectsQuery = `*[_type == "project"]{ slug }`

// Query to fetch blog post slugs from Sanity
const blogPostsQuery = `*[_type == "blog.post"]{ "slug": metadata.slug.current, publishDate }`

export default async function handler(req, res) {
  try {
    // Fetch projects from Sanity
    const projects = await sanity.fetch(projectsQuery)
    // Fetch blog posts from Sanity
    const blogPosts = await sanity.fetch(blogPostsQuery)

    // Define static pages
    const staticPages = ['', 'projects', 'blog', 'contact'].map((page) => ({
      loc: `${baseUrl}/${page}`,
      lastmod: new Date().toISOString(),
    }))

    // Generate project URLs
    const projectUrls = projects.map((project) => ({
      loc: `${baseUrl}/projects/${project.slug}`,
      lastmod: new Date().toISOString(),
    }))

    // Generate blog post URLs
    const blogPostUrls = blogPosts.map((post) => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: post.publishDate || new Date().toISOString(),
    }))

    // Combine static pages, project pages, and blog posts
    const allPages = [...staticPages, ...projectUrls, ...blogPostUrls]

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${allPages
        .map(
          ({ loc, lastmod }) => `
        <url>
          <loc>${loc}</loc>
          <lastmod>${lastmod}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>${
            loc === 'https://www.gavingrant.com/' ? '1.0' : '0.8'
          }</priority>
        </url>
      `
        )
        .join('')}
    </urlset>`

    // Set response headers
    res.setHeader('Content-Type', 'application/xml')
    res.status(200).send(sitemap)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    res.status(500).send('Internal Server Error')
  }
}
