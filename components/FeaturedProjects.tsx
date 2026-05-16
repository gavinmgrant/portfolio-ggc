import Link from 'next/link'
import { Button } from '@heroui/react'
import { getSanityImageUrl } from '../utils/getSanityImageUrl'
import ProjectCard from './ProjectCard'
import Divider from './Divider'
import AnimatedSection from './AnimatedSection'

export interface FeaturedProjectData {
  featured: boolean
  slug: string
  name: string
  description: string
  image?: {
    asset: {
      _ref: string
    }
  }
}

export default function FeaturedProjects({
  projects,
}: {
  projects: FeaturedProjectData[]
}) {
  if (projects.length === 0) {
    return null
  }

  const headingText =
    projects.length === 1 ? 'Featured project' : 'Featured projects'

  return (
    <>
      <AnimatedSection className="flex flex-col items-center justify-center gap-6 py-8 sm:py-28">
        <section
          aria-label={headingText}
          className="flex w-full flex-col items-center gap-6"
        >
          <h2
            id="featured-projects-heading"
            className="heading-size-lg font-semibold"
          >
            {headingText}
          </h2>

          <div className="grid w-full grid-cols-1 items-stretch gap-4 overflow-visible p-1 sm:gap-6 md:grid-cols-2 2xl:max-w-[1536px] 2xl:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={project.slug}
                className="flex h-full min-h-0 min-w-0 flex-col overflow-visible"
              >
                <ProjectCard
                  index={index}
                  slug={project.slug}
                  imgsrc={getSanityImageUrl(project.image?.asset._ref)}
                  name={project.name}
                  description={project.description}
                  type="projects"
                />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center pt-4">
            <Button
              as={Link}
              href="/projects"
              color="primary"
              radius="sm"
              size="lg"
            >
              View all projects
            </Button>
          </div>
        </section>
      </AnimatedSection>
      <Divider />
    </>
  )
}
