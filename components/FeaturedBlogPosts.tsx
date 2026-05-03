import { getSanityImageUrl } from '../utils/getSanityImageUrl'
import ProjectCard from './ProjectCard'
import Divider from './Divider'
import AnimatedSection from './AnimatedSection'

export interface FeaturedBlogPostData {
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

export default function FeaturedBlogPosts({
  posts,
}: {
  posts: FeaturedBlogPostData[]
}) {
  if (posts.length === 0) {
    return null
  }

  const headingText =
    posts.length === 1 ? 'Featured blog post' : 'Featured blog posts'

  return (
    <>
      <AnimatedSection className="flex flex-col items-center justify-center gap-6 py-8 sm:py-28">
        <section
          aria-label={headingText}
          className="flex w-full flex-col items-center gap-6"
        >
          <h2
            id="featured-blog-heading"
            className="heading-size-lg font-semibold"
          >
            {headingText}
          </h2>

          <div className="grid w-full grid-cols-1 items-stretch gap-4 overflow-visible p-1 sm:gap-6 md:grid-cols-2 2xl:max-w-[1536px] 2xl:grid-cols-3">
            {posts.map((post, index) => (
              <div
                key={post.metadata.slug.current}
                className="flex h-full min-h-0 min-w-0 flex-col overflow-visible"
              >
                <ProjectCard
                  index={index}
                  slug={post.metadata.slug.current}
                  imgsrc={getSanityImageUrl(post.metadata.image?.asset._ref)}
                  name={post.metadata.title}
                  description={post.metadata.description}
                  type="blog"
                  publishDate={post.publishDate}
                  readingTime={post.estimatedReadingTime}
                />
              </div>
            ))}
          </div>
        </section>
      </AnimatedSection>
      <Divider />
    </>
  )
}
