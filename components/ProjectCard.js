import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { getDisplayDate } from '../utils/getDisplayDate'

const ProjectCard = ({
  index,
  slug,
  imgsrc,
  name,
  description,
  type,
  publishDate,
  readingTime,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 20 })
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 20 })

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [5, -5])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-5, 5])

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const mouseX = e.clientX - left
    const mouseY = e.clientY - top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      className="h-full"
      style={{ perspective: 1200 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0 + index * 0.05 }}
      viewport={{ once: true }}
    >
      <motion.div
        className="relative h-full w-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.98 }}
        style={{
          rotateX,
          rotateY,
        }}
      >
        <Link
          href={`/${type}/${slug}`}
          className="flex h-full min-h-0 flex-col"
        >
          <div className="light-border flex h-full min-h-0 flex-col rounded-[20px] border-[0.5px] p-4 transition-all duration-300 ease-in-out hover:border-black dark:hover:border-white lg:p-5">
            <div key={slug} className="flex min-h-0 flex-1 flex-col">
              {imgsrc && (
                <div className="light-border relative mb-4 aspect-[548/300] max-h-[600px] w-full max-w-full shrink-0 overflow-hidden rounded-xl border-[0.5px]">
                  {!isLoaded && (
                    <div className="absolute inset-0 z-10 animate-pulse rounded-xl bg-slate-300"></div>
                  )}
                  <Image
                    className="cursor-pointer overflow-hidden rounded-xl"
                    alt={name}
                    src={imgsrc}
                    objectFit='cover'
                    fill
                    sizes="(max-width: 767px) 100vw, (max-width: 1535px) 50vw, 33vw"
                    onLoad={() => setIsLoaded(true)}
                    priority={index === 0 || index === 1 || index === 2}
                  />
                </div>
              )}
              <div className="flex min-h-0 flex-1 flex-col cursor-pointer">
                <h2 className="text-xl font-semibold sm:text-2xl">{name}</h2>
                {publishDate && (
                  <div className="my-2 flex items-center justify-between text-sm opacity-70 sm:my-3">
                    <p className="py-0">{getDisplayDate(publishDate)}</p>
                    <p className="light-border rounded-full border px-3 py-0">
                      {readingTime} min read
                    </p>
                  </div>
                )}
                <p className="mt-3 flex-1 p-0 text-sm lg:text-base">{description}</p>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    </motion.div>
  )
}

export default ProjectCard
