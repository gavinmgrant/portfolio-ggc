import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { wrap } from 'popmotion'

const testimonials = [
  {
    name: 'Alex Kambeitz',
    title: 'Software Engineer at Sessions',
    quote: `"Working with Gavin was one of the highlights of my time at Sessions. His dedication to building solid UI components and his attention to detail made him stand out as a developer on my team, and I knew I could rely on him to tackle whatever task I sent his way. He brought with him the talent and experience needed to make his mark on the engineering team in the best way. Gavin is also a delightful person just to get to know! Even in a full remote world, Gavin was kind and thoughtful in every interaction I had with him. The one time I finally got to meet him in person, it felt like seeing a friend I'd known for years. Any team would be beyond fortunate to work alongside him."`,
  },
  {
    name: 'Cyd La Luz',
    title: 'Software Engineer at Google',
    quote: `"Gavin Grant is a highly adaptable professional who, as my student in Bloc, demonstrated not only a strong grasp of core coding concepts but also regularly pushed himself to do research and work beyond the curriculum to ensure that he had not only a well built profile, but also to ensure that he built genuinely useful applications. Gavin is a builder in the best sense: he cares about the best standards in technology, elegance and economy in code and design, and he gets work done. I strongly encourage anyone looking at Gavin's profile to check out the work he's done as it really speaks for itself."`,
  },
  {
    name: 'Spencer Skeen',
    title: 'Lead Developer at AndAlways',
    quote: `"Over the past year and a half, working with Gavin has been an absolute pleasure. As soon as he joined our team, he wasted no time in providing creative, yet analytical solutions to various arising problems where several of these solutions lead to increased conversions rates for the Company's e-commerce platform. Gavin's attention to detail while still maintaining a macro-level view of a problem is a unique trait within any software developer. His radiating energy and enthusiasm when working on any project seeps motivation into his peers and even superiors. This, along with being a skillful communicator led to creating an invaluable and positive working environment across the team."`,
  },
]

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }
  },
}

const Testimonials = () => {
  const [[page, direction], setPage] = useState([0, 0])

  const testimonialIndex = wrap(0, testimonials.length, page)

  const paginate = (newDirection) => {
    setPage([page + newDirection, newDirection])
  }

  return (
    <div className="relative w-screen text-center lg:ml-4 lg:text-left" style={{ height: "65vh" }}>
      <motion.h2
        className="mb-8 text-3xl font-semibold text-gray-900 dark:text-white lg:mb-12 lg:text-4xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Testimonials
      </motion.h2>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={testimonials[testimonialIndex].name}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
          }}
        >
          <div className="card absolute m-4 mt-12 text-gray-900 dark:text-white lg:m-0 lg:mt-12 lg:max-w-4xl">
            <p className="mb-4 text-left">
              {testimonials[testimonialIndex].quote}
            </p>
            <div className="relative bottom-0">
              <h5 className="text-right text-xl font-semibold">
                {testimonials[testimonialIndex].name}
              </h5>
              <p className="m-0 p-0 text-right">
                {testimonials[testimonialIndex].title}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      <button className="mr-6 text-2xl" onClick={() => paginate(1)}>
        &#9664;
      </button>
      <button className="ml-6 text-2xl" onClick={() => paginate(-1)}>
        &#9654;
      </button>
    </div>
  )
}

export default Testimonials
