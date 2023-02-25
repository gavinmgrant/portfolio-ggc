import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const ProjectCard = ({ index, slug, imgsrc, title, name, description }) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0 + index * 0.1 }}
      viewport={{ once: true }}
    >
      <Link href={`/projects/${encodeURIComponent(slug)}`}>
        <div key={slug}>
          <div
            className="overflow-hidden rounded-md shadow-lg"
            style={{
              position: 'relative',
              maxWidth: '600px',
              maxHeight: '400px',
            }}
          >
            {!isLoaded && (
              <div className="z-10 h-[400px] w-[600px] animate-pulse bg-slate-300"></div>
            )}
            <Image
              alt={title}
              src={imgsrc}
              width={600}
              height={400}
              layout="responsive"
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
