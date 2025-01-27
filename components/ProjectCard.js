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
          <div className="aspect-[548/300] relative max-h-[490px] max-w-[735px] overflow-hidden rounded-md shadow-lg shadow-neutral-300 dark:shadow-neutral-700">
            {!isLoaded && (
              <div className="absolute left-0 top-0 z-10 h-[490px] w-[735px] animate-pulse overflow-hidden rounded-md bg-slate-300"></div>
            )}
            <Image
              alt={name}
              src={imgsrc}
              width={735}
              height={490}
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
