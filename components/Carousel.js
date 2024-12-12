import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Loader from './Loader'
import { getSanityImageUrl } from '../utils/getSanityImageUrl'
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons'

const Carousel = ({ sanityImages, projectName }) => {
  const [current, setCurrent] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInitialLoaded, setIsInitialLoaded] = useState(false)
  const [images, setImages] = useState([])
  const [isHovered, setIsHovered] = useState(false)

  if (!Array.isArray(sanityImages) || sanityImages.length === 0) {
    return (
      <div className="flex aspect-[2860/1614] w-[940px] items-center justify-center rounded-lg bg-gray-200 shadow-lg">
        <p className="text-gray-500">No images available for this project</p>
      </div>
    )
  }

  useEffect(() => {
    setIsInitialLoaded(false)
    let imageUrls = sanityImages.map((image) =>
      getSanityImageUrl(image.asset._ref)
    )
    setImages(imageUrls)
    setTimeout(() => setIsLoaded(true), 3000)
  }, [sanityImages])

  const nextSlide = () => {
    setIsLoaded(false)
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setIsLoaded(false)
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  }

  const arrowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
  }

  const handleInitialLoad = () => {
    setIsInitialLoaded(true)
    setIsLoaded(true)
  }

  const handleLoaded = () => {
    setIsLoaded(true)
  }

  return (
    <div
      className="relative aspect-[2860/1614] w-full rounded-lg object-contain shadow-lg shadow-neutral-300 dark:shadow-neutral-700 lg:w-[940px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="h-full w-full overflow-hidden"
          >
            <Image
              alt={projectName}
              src={images[current]}
              width={940}
              height={531}
              quality={100}
              className={`h-full w-full overflow-hidden rounded-lg object-cover ${
                !isLoaded && 'animate-pulse'
              }`}
              onLoadingComplete={
                current === 0 ? handleInitialLoad : handleLoaded
              }
              priority={true}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {(!isInitialLoaded || !isLoaded) && (
        <div className="absolute left-0 top-0 z-10 flex aspect-[2860/1614] w-full animate-pulse items-center justify-center rounded-lg bg-neutral-300 dark:bg-neutral-700 lg:h-[531px] lg:w-[940px]">
          <Loader className="z-20" />
        </div>
      )}

      {/* Left arrow */}
      <AnimatePresence>
        {isHovered && sanityImages.length > 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={arrowVariants}
            className="absolute top-1/2 left-4 z-20 -translate-y-1/2 transform"
          >
            <button
              onClick={prevSlide}
              className="rounded-full bg-neutral-900 bg-opacity-50 p-2 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-70 focus:outline-none active:scale-75"
            >
              <IconArrowNarrowLeft />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Right arrow */}
      <AnimatePresence>
        {isHovered && sanityImages.length > 1 && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={arrowVariants}
            className="absolute top-1/2 right-4 z-20 -translate-y-1/2 transform"
          >
            <button
              onClick={nextSlide}
              className="rounded-full bg-neutral-900 bg-opacity-50 p-2 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-70 focus:outline-none active:scale-75"
            >
              <IconArrowNarrowRight />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pagination */}
      {sanityImages.length > 1 && (
        <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`h-3 w-3 rounded-full ${
                current === idx ? 'bg-black dark:bg-white' : 'bg-neutral-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Carousel
