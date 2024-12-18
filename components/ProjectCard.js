import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const ProjectCard = ({ index, slug, imgsrc, name, description }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0 + index * 0.05 }}
      viewport={{ once: true }}
    >
      <Link href={`/projects/${encodeURIComponent(slug)}`}>
        <div key={slug}>
          <div
            className="relative overflow-hidden rounded-md shadow-lg shadow-neutral-300 dark:shadow-neutral-700"
            style={{
              position: 'relative',
              maxWidth: '548px',
              maxHeight: '310px',
            }}
          >
            {!isLoaded && (
              <div className="absolute top-0 left-0 z-10 aspect-[3/2] h-[310px] w-[548px] animate-pulse overflow-hidden rounded-md bg-slate-300"></div>
            )}
            <Image
              alt={name}
              src={imgsrc}
              width={600}
              height={400}
              onLoad={() => setIsLoaded(true)}
              className="cursor-pointer overflow-hidden rounded-md transition-all duration-300 ease-in-out hover:scale-105"
              priority={index === 0 || index === 1}
            />
          </div>
          <div className="cursor-pointer">
            <h2 className="my-4 text-2xl font-semibold">{name}</h2>
            <p>{description}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProjectCard
