import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { wrap } from 'popmotion'
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'
import AnimatedSection from './AnimatedSection'

const testimonials = [
  {
    name: 'James Lawrence',
    title: 'CEO at POWER Automotive Media',
    quote: `"I had the pleasure of working with Gavin Grant as an engineer at Happy Companies, and I can say without hesitation that he was one of the most professional, reliable, and downright good human beings I’ve had the chance to work alongside. Gavin brought a calm, focused energy to every project — always dependable, always thoughtful, and always two steps ahead in anticipating what was needed. He consistently delivered high-quality work, communicated clearly, and was the kind of teammate who made everyone around him better. Whether navigating complex systems or collaborating cross-functionally, Gavin handled it all with grace, humility, and sharp technical insight. Beyond his engineering chops, Gavin’s character stood out even more. He showed up every day with a great attitude, genuine kindness, and a sense of integrity that you don’t come across often enough."`,
  },
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

/** Matches ProjectCard outer shell (no link / tilt / image). */
const CARD_SHELL =
  'light-border relative flex w-full min-h-0 flex-col rounded-[20px] border-[0.5px] transition-all duration-300 ease-in-out hover:border-black dark:hover:border-white'

const Testimonials = () => {
  const [[page, direction], setPage] = useState([0, 0])
  const testimonialIndex = wrap(0, testimonials.length, page)

  const paginate = (newDirection) =>
    setPage([page + newDirection, newDirection])

  const current = testimonials[testimonialIndex]

  return (
    <div className="flex w-screen items-center justify-center lg:min-h-[calc(100vh-168px)]">
      <AnimatedSection className="flex w-full max-w-[1536px] flex-col items-center gap-6 px-4 py-8 sm:gap-8 sm:py-20 lg:gap-10">
        <h2
          id="testimonials-heading"
          className="heading-size-lg text-center font-semibold"
        >
          Testimonials
        </h2>

        <section
          aria-labelledby="testimonials-heading"
          aria-roledescription="carousel"
          aria-label="Testimonials"
          className="relative w-full max-w-[900px]"
        >
          <div className={`${CARD_SHELL} p-4 lg:p-5`}>
            <button
              type="button"
              onClick={() => paginate(-1)}
              aria-label="Previous testimonial"
              className="absolute left-1 top-1/2 z-20 -translate-y-1/2 rounded-md p-1 transition-all ease-in-out hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:scale-90 sm:left-2 md:left-3"
            >
              <IconChevronLeft className="h-8 w-8 sm:h-10 sm:w-10 lg:h-11 lg:w-11" />
            </button>
            <button
              type="button"
              onClick={() => paginate(1)}
              aria-label="Next testimonial"
              className="absolute right-1 top-1/2 z-20 -translate-y-1/2 rounded-md p-1 transition-all ease-in-out hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:scale-90 sm:right-2 md:right-3"
            >
              <IconChevronRight className="h-8 w-8 sm:h-10 sm:w-10 lg:h-11 lg:w-11" />
            </button>

            <div className="relative overflow-hidden px-10 py-4 sm:px-12 md:px-14">
              <AnimatePresence mode="wait" initial={false} custom={direction}>
                <motion.div
                  key={current.name}
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
                  className="w-full text-center lg:text-left"
                >
                  <p className="mb-6 text-sm lg:text-base">{current.quote}</p>
                  <div className="mt-4 text-center lg:text-left">
                    <h3 className="text-xl font-semibold sm:text-2xl">
                      {current.name}
                    </h3>
                    <p className="mt-1 text-sm opacity-80">{current.title}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}

export default Testimonials
