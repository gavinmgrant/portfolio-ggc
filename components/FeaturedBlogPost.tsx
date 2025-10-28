import { useEffect, useState } from 'react'
import { getSanityImageUrl } from '../utils/getSanityImageUrl'
import ProjectCard from './ProjectCard'
import Divider from './Divider'

interface BlogPost {
  featured: boolean
  publishDate: string
  metadata: {
    title: string
    description: string
    slug: {
      current: string
    }
    image?: {
      asset: {
        _ref: string
      }
    }
  }
  estimatedReadingTime: number
}

export default function FeaturedBlogPost() {
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchFeaturedPost() {
      try {
        const response = await fetch('/api/featured-post')
        if (response.ok) {
          const post = await response.json()
          setFeaturedPost(post)
        }
      } catch (error) {
        console.error('Error fetching featured blog post:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedPost()
  }, [])

  if (loading) {
    return null
  }

  if (!featuredPost) {
    return null
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center gap-6 py-8 sm:py-28">
        <h2 className="heading-size-lg font-semibold">Featured Blog Post</h2>
        <div className="max-w-[900px] w-full">
          <ProjectCard
            index={0}
            key={featuredPost.metadata.slug.current}
            slug={featuredPost.metadata.slug.current}
            imgsrc={getSanityImageUrl(featuredPost.metadata.image?.asset._ref)}
            name={featuredPost.metadata.title}
            description={featuredPost.metadata.description}
            type="blog"
            publishDate={featuredPost.publishDate}
            readingTime={featuredPost.estimatedReadingTime}
          />
        </div>
      </div>
      <Divider />
    </>
  )
}
