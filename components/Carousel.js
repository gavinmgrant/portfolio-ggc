import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import NextImage from 'next/image'
import Loader from './Loader'
import { getSanityImageUrl } from '../utils/getSanityImageUrl'
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons'

const Carousel = ({ sanityImages, projectName }) => {
  const [current, setCurrent] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [images, setImages] = useState([])

  if (!Array.isArray(sanityImages) || sanityImages.length === 0) {
    return (
      <div className="flex aspect-[2860/1614] w-[940px] items-center justify-center rounded-lg bg-gray-200 shadow-lg">
        <p className="text-gray-500">No images available for this project</p>
      </div>
    )
  }

  useEffect(() => {
    const imageUrls = sanityImages.map((image) =>
      getSanityImageUrl(image.asset._ref, 1600, 75)
    )
    setImages(imageUrls)

    const preloadImages = imageUrls.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = resolve
          img.onerror = resolve
        })
    )

    Promise.all(preloadImages).then(() => {
      setIsLoading(false)
    })
  }, [sanityImages])

  const preloadImage = (src, callback) => {
    const img = new Image()
    img.src = src
    img.onload = callback
  }

  const changeSlide = (index) => {
    setIsLoading(true)
    preloadImage(images[index], () => {
      setCurrent(index)
      setIsLoading(false)
    })
  }

  const nextSlide = () => {
    const nextIndex = (current + 1) % images.length
    changeSlide(nextIndex)
  }

  const prevSlide = () => {
    const prevIndex = (current - 1 + images.length) % images.length
    changeSlide(prevIndex)
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

  return (
    <div className="relative aspect-[2860/1614] w-full rounded-lg object-contain shadow-lg shadow-neutral-300 dark:shadow-neutral-700 lg:w-[1080px]">
      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-neutral-300 dark:bg-neutral-700">
        <Loader />
      </div>

      {!isLoading && (
        <div className="relative z-10 h-full w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={variants}
              className="h-full w-full overflow-hidden"
            >
              <NextImage
                alt={projectName}
                src={images[current]}
                width={940}
                height={531}
                quality={100}
                className={`h-full w-full rounded-lg object-cover ${
                  isLoading && 'opacity-0'
                }`}
                onLoadingComplete={() => setIsLoading(false)}
                priority={current === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      )}

      {/* Left arrow */}
      {sanityImages.length > 1 && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={arrowVariants}
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 transform"
        >
          <button
            onClick={prevSlide}
            className="rounded-full bg-neutral-900 bg-opacity-50 p-2 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-70 focus:outline-none active:scale-75"
          >
            <IconArrowNarrowLeft />
          </button>
        </motion.div>
      )}

      {/* Right arrow */}
      {sanityImages.length > 1 && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={arrowVariants}
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 transform"
        >
          <button
            onClick={nextSlide}
            className="rounded-full bg-neutral-900 bg-opacity-50 p-2 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-70 focus:outline-none active:scale-75"
          >
            <IconArrowNarrowRight />
          </button>
        </motion.div>
      )}

      {/* Pagination */}
      {sanityImages.length > 1 && (
        <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => changeSlide(idx)}
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
