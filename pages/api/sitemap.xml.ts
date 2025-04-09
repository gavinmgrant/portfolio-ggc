import { getClient } from '../../lib/sanity'
import type { NextApiRequest, NextApiResponse } from 'next'
import {
  SITEMAP_PROJECTS_QUERY,
  SITEMAP_BLOG_POSTS_QUERY,
} from '../../lib/queries'

interface SitemapUrl {
  loc: string
  lastmod: string
  priority?: string
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never'
}

interface Project {
  slug: string
}

interface BlogPost {
  slug: string
  publishDate?: string
}

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = getClient()
  try {
    // Fetch projects from Sanity
    const projects: Project[] = await client.fetch(SITEMAP_PROJECTS_QUERY)
    // Fetch blog posts from Sanity
    const blogPosts: BlogPost[] = await client.fetch(SITEMAP_BLOG_POSTS_QUERY)

    const generateStaticPages = (): SitemapUrl[] => {
      const pages = ['', 'projects', 'blog', 'contact', 'search']
      const now = new Date().toISOString()

      return pages.map((page) => ({
        loc: `${baseUrl}/${page}`,
        lastmod: now,
        changefreq: 'weekly',
        priority: page === '' ? '1.0' : '0.8',
      }))
    }

    // Define static pages
    const staticPages = generateStaticPages()

    // Generate project URLs
    const projectUrls: SitemapUrl[] = projects.map((project) => ({
      loc: `${baseUrl}/projects/${project.slug}`,
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: '0.8',
    }))

    const formatDate = (date?: string): string => {
      const d = date ? new Date(date) : new Date()
      return d.toISOString()
    }

    // Generate blog post URLs
    const blogPostUrls: SitemapUrl[] = blogPosts.map((post) => ({
      loc: `${baseUrl}/blog/${post.slug}`,
      lastmod: formatDate(post.publishDate),
      changefreq: 'monthly',
      priority: '0.9',
    }))

    // Combine static pages, project pages, and blog posts
    const allPages = [...staticPages, ...projectUrls, ...blogPostUrls]

    const generateSitemapXml = (urls: SitemapUrl[]): string => {
      const urlElements = urls
        .map(
          ({ loc, lastmod, changefreq, priority }) => `
        <url>
          <loc>${loc}</loc>
          <lastmod>${lastmod}</lastmod>
          ${changefreq ? `<changefreq>${changefreq}</changefreq>` : ''}
          ${priority ? `<priority>${priority}</priority>` : ''}
        </url>`
        )
        .join('')

      return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}
    </urlset>`
    }

    // Generate XML
    const sitemap = generateSitemapXml(allPages)

    // Set response headers
    res.setHeader('Content-Type', 'application/xml')
    res.status(200).send(sitemap)
  } catch (error) {
    console.error('Error generating sitemap:', error)
    res.status(500).json({ error: 'Failed to generate sitemap' })
  }
}
