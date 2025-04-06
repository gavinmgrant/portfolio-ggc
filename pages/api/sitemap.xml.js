import { getClient } from '../../lib/sanity'
import {
  SITEMAP_PROJECTS_QUERY,
  SITEMAP_BLOG_POSTS_QUERY,
} from '../../lib/queries'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

export default async function handler(req, res) {
  const client = getClient()
  try {
    // Fetch projects from Sanity
    const projects = await client.fetch(SITEMAP_PROJECTS_QUERY)
    // Fetch blog posts from Sanity
    const blogPosts = await client.fetch(SITEMAP_BLOG_POSTS_QUERY)

    // Define static pages
    const staticPages = ['', 'projects', 'blog', 'contact', 'search'].map(
      (page) => ({
        loc: `${baseUrl}/${page}`,
        lastmod: new Date().toISOString(),
      })
    )

    // Generate project URLs
    const projectUrls = projects.map((project) => ({
      loc: `${baseUrl}/projects/${project.slug}`,
      lastmod: new Date().toISOString(),
    }))

    const convertDateToISO = (date) => {
      let d
      if (!date) {
        d = Date()
      } else {
        d = new Date(date)
      }
      return d.toISOString()
    }

    // Generate blog post URLs
    const blogPostUrls = blogPosts.map((post) => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: convertDateToISO(post.publishDate),
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
            loc === `${baseUrl}/` ? '1.0' : '0.8'
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
