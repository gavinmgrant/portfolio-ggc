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
      <motion.div
        className="light-border !h-full rounded-[20px] border-[0.5px] p-4 transition-all duration-300 ease-in-out hover:border-black dark:hover:border-white"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.99 }}
      >
        <Link href={`/projects/${encodeURIComponent(slug)}`}>
          <div key={slug}>
            <div className="light-border relative aspect-[548/300] max-h-[490px] max-w-[735px] overflow-hidden rounded-xl border-[0.5px]">
              {!isLoaded && (
                <div className="absolute left-0 top-0 z-10 h-[490px] w-[735px] animate-pulse overflow-hidden rounded-xl bg-slate-300"></div>
              )}
              <Image
                alt={name}
                src={imgsrc}
                width={735}
                height={490}
                onLoad={() => setIsLoaded(true)}
                className="cursor-pointer overflow-hidden rounded-xl"
                priority={index === 0 || index === 1}
              />
            </div>
            <div className="cursor-pointer">
              <h2 className="mt-4 text-xl font-semibold sm:text-2xl">{name}</h2>
              <p className="text-sm lg:text-base">{description}</p>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard
