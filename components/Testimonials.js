import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { wrap } from 'popmotion'
import { IconArrowNarrowLeft, IconArrowNarrowRight } from '@tabler/icons'

const testimonials = [
  {
    name: 'Cyd La Luz',
    title: 'Software Engineer at Google',
    quote: `"Gavin Grant is a highly adaptable professional who, as my student in Bloc, demonstrated not only a strong grasp of core coding concepts but also regularly pushed himself to do research and work beyond the curriculum to ensure that he had not only a well built profile, but also to ensure that he built genuinely useful applications. Gavin is a builder in the best sense: he cares about the best standards in technology, elegance and economy in code and design, and he gets work done. I strongly encourage anyone looking at Gavin's profile to check out the work he's done as it really speaks for itself."`,
  },
  {
    name: 'Alex Kambeitz',
    title: 'Staff Software Engineer at NBCUniversal',
    quote: `"Working with Gavin was one of the highlights of my time at Sessions. His dedication to building solid UI components and his attention to detail made him stand out as a developer on my team, and I knew I could rely on him to tackle whatever task I sent his way. He brought with him the talent and experience needed to make his mark on the engineering team in the best way. Gavin is also a delightful person just to get to know! Even in a full remote world, Gavin was kind and thoughtful in every interaction I had with him. The one time I finally got to meet him in person, it felt like seeing a friend I'd known for years. Any team would be beyond fortunate to work alongside him."`,
  },
  {
    name: 'Spencer Skeen',
    title: 'CTO at Pool House Media',
    quote: `"Over the past year and a half, working with Gavin has been an absolute pleasure. As soon as he joined our team, he wasted no time in providing creative, yet analytical solutions to various arising problems where several of these solutions lead to increased conversions rates for the Company's e-commerce platform. Gavin's attention to detail while still maintaining a macro-level view of a problem is a unique trait within any software developer. His radiating energy and enthusiasm when working on any project seeps motivation into his peers and even superiors. This, along with being a skillful communicator led to creating an invaluable and positive working environment across the team."`,
  },
]

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
}

const Testimonials = () => {
  const [[page, direction], setPage] = useState([0, 0])
  const testimonialIndex = wrap(0, testimonials.length, page)

  const paginate = (newDirection) =>
    setPage([page + newDirection, newDirection])

  return (
    <div className="flex w-screen items-center justify-center lg:h-[calc(100vh-160px)]">
      <div className="flex h-[700px] w-full max-w-[1536px] flex-col items-center justify-center px-4 py-12 xs:h-[520px] sm:h-[480px] md:h-[420px] lg:h-[560px] lg:py-20">
        <h2 className="heading-size-lg font-semibold">Testimonials</h2>

        <div className="flex h-full w-full max-w-[1000px] items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-24">
          <button
            onClick={() => paginate(-1)}
            className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-200 bg-opacity-50 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-opacity-70 focus:outline-none active:scale-90 sm:h-12 sm:w-12"
          >
            <IconArrowNarrowLeft />
          </button>

          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={testimonials[testimonialIndex].name}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    stiffness: 100,
                    damping: 30,
                    ease: 'linear',
                    duration: 0.4,
                  },
                }}
                className="absolute w-full"
              >
                <p className="mb-4 text-justify text-sm lg:text-base">
                  {testimonials[testimonialIndex].quote}
                </p>
                <div className="mt-4 text-center lg:text-right">
                  <h5 className="text-lg font-semibold">
                    {testimonials[testimonialIndex].name}
                  </h5>
                  <p className="text-sm">
                    {testimonials[testimonialIndex].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={() => paginate(1)}
            className="z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-neutral-200 bg-opacity-50 transition-all duration-300 ease-in-out hover:scale-110 hover:bg-opacity-70 focus:outline-none active:scale-90 sm:h-12 sm:w-12"
          >
            <IconArrowNarrowRight />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Testimonials
