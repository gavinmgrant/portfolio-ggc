import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Loader from './Loader'
import { getSanityImageUrl } from '../utils/getSanityImageUrl'
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons'

const Carousel = ({ sanityImages, projectUrl, projectName }) => {
  const [current, setCurrent] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [images, setImages] = useState([])

  if (!Array.isArray(sanityImages) || sanityImages.length === 0) {
    return (
      <div className="flex aspect-[2860/1614] w-[900px] items-center justify-center rounded-md bg-gray-200 shadow-lg">
        <p className="text-gray-500">No images available for this project</p>
      </div>
    )
  }

  useEffect(() => {
    let imageUrls = sanityImages.map((image) =>
      getSanityImageUrl(image.asset._ref)
    )
    setImages(imageUrls)
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

  return (
    <div className="relative aspect-[2860/1614] w-full rounded-md object-contain shadow-lg shadow-neutral-300 dark:shadow-neutral-700 lg:w-[900px]">
      <motion.div
        initial="hidden"
        animate={isLoaded ? 'visible' : 'hidden'}
        className="relative"
      >
        <AnimatePresence mode='wait'>
          <motion.div
            key={current}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            className="overflow-hidden"
          >
            <Image
              alt={projectName}
              src={images[current]}
              width={900}
              height={508}
              quality={100}
              className={`overflow-hidden rounded-md ${
                !isLoaded && 'animate-pulse'
              }`}
              onLoad={() => setIsLoaded(true)}
              priority={true}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>
      {!isLoaded && <div className='aspect-[2860/1614] w-full lg:w-[900px] lg:h-[508px] z-10 bg-neutral-300 animate-pulse rounded-md absolute left-0 top-0 flex items-center justify-center'><Loader className="z-20" /></div>}
   

      {/* Left arrow */}
      <button
        onClick={prevSlide}
        className="absolute top-1/2 left-2 -translate-y-1/2 transform rounded-full bg-neutral-900 bg-opacity-50 p-2 text-white hover:bg-opacity-70 focus:outline-none z-20 transition-all duration-300 ease-in-out hover:scale-105"
      >
        <IconArrowNarrowLeft />
      </button>

      {/* Right arrow */}
      <button
        onClick={nextSlide}
        className="absolute top-1/2 right-2 -translate-y-1/2 transform rounded-full bg-neutral-900 bg-opacity-50 p-2 text-white hover:bg-opacity-70 focus:outline-none z-20 transition-all duration-300 ease-in-out hover:scale-105"
      >
        <IconArrowNarrowRight />
      </button>

      {/* Pagination */}
      <div className="absolute -bottom-7 left-1/2 flex -translate-x-1/2 transform space-x-2">
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
    </div>
  )
}

export default Carousel
