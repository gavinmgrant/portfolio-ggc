import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import NextImage from 'next/image'
import Loader from './Loader'
import { getSanityImageUrl } from '../utils/getSanityImageUrl'
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons'

const Carousel = ({ sanityImages, projectName }) => {
  const [current, setCurrent] = useState(0)
  const [images, setImages] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRight, setIsRight] = useState(true)

  useEffect(() => {
    if (!Array.isArray(sanityImages) || sanityImages.length === 0) return

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
      setTimeout(() => {
        setIsLoading(false)
      }, 500)
    })
  }, [sanityImages])

  const nextSlide = () => {
    setIsRight(true)
    setCurrent((prev) => (prev + 1) % images.length)
  }
  const prevSlide = () => {
    setIsRight(false)
    setCurrent((prev) => (prev - 1 + images.length) % images.length)
  }

  if (!sanityImages || sanityImages.length === 0) {
    return (
      <div className="flex aspect-[2860/1614] w-[940px] items-center justify-center rounded-lg bg-gray-200 shadow-lg">
        <p className="text-gray-500">No images available for this project</p>
      </div>
    )
  }

  return (
    <div className="relative aspect-[2860/1614] w-full rounded-lg object-contain shadow-lg shadow-neutral-300 dark:shadow-neutral-700 lg:w-[1080px]">
      <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
        {isLoading && <Loader />}
      </div>
      {!isLoading && (
        <div className="relative z-10 h-full w-full overflow-clip rounded-lg">
          {images.map(
            (image, index) =>
              current === index && (
                <motion.div
                  key={index}
                  className="relative h-full w-full overflow-hidden"
                  initial={{ opacity: 0, x: isRight ? 200 : -200 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.25 }}
                >
                  <NextImage
                    alt={projectName}
                    src={index === current ? image : images[current]}
                    width={940}
                    height={531}
                    quality={100}
                    className="absolute left-0 top-0 h-full w-full rounded-lg object-cover"
                    loading="lazy"
                  />
                </motion.div>
              )
          )}
        </div>
      )}
      {/* Navigation Arrows */}
      {images.length > 1 && (
        <>
          <motion.div
            intial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 transform"
          >
            <button
              onClick={prevSlide}
              className="rounded-full bg-neutral-900 bg-opacity-50 p-2 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-70 focus:outline-none active:scale-75"
            >
              <IconArrowNarrowLeft />
            </button>
          </motion.div>
          <motion.div
            intial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 transform"
          >
            <button
              onClick={nextSlide}
              className="rounded-full bg-neutral-900 bg-opacity-50 p-2 text-white transition-all duration-300 ease-in-out hover:scale-105 hover:bg-opacity-70 focus:outline-none active:scale-75"
            >
              <IconArrowNarrowRight />
            </button>
          </motion.div>
        </>
      )}
      {/* Pagination */}
      {images.length > 1 && (
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
