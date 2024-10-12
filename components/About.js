import React from 'react'
import Image from 'next/image'
import headshotDark from '../public/images/headshot-dark.jpg'
import headshotLight from '../public/images/headshot-light.jpg'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className="container mx-auto my-20 flex h-full max-w-3xl items-center justify-center px-4 lg:my-0 lg:h-screen lg:max-w-6xl">
      <div className="flex flex-col-reverse items-center justify-center text-center lg:mx-4 lg:flex-row lg:text-left gap-8">
        <div className="lg:px-4">
          <motion.h1
            className="text-4xl font-semibold text-neutral-900 dark:text-white lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.75 }}
          >
            Hi, I'm Gavin.
          </motion.h1>
          <motion.div
            className="mt-2 text-neutral-800 dark:text-white lg:mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4 }}
          >
            <p className="mb-4">
              Hi, I'm a forward-thinking software engineer,
              specializing in front-end development. With a background in
              architecture, I bring a unique perspective to crafting captivating
              digital experiences. Armed with expertise in JavaScript,
              TypeScript, React, Next.js, Vue.js, Nuxt.js, Node.js, Express, and
              more.
            </p>
            <p className="mb-4">
              Currently, I'm the driving force behind front-end
              engineering at{' '}
              <a
                className="font-medium transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
                href="https://happycompanies.com/"
                target="_blank"
              >
                Happy Companies
              </a>
              , where I'm dedicated to delivering top-notch solutions that
              delight users.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4.25 }}
          >
            <motion.button
              className="btn-primary lg:mt-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <a href="/projects">View Projects</a>
            </motion.button>
          </motion.div>
        </div>
        <motion.div
          className="mb-6 flex-shrink-0 lg:mb-10 lg:mt-12 lg:pl-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5 }}
        >
          <Image
            src={headshotDark}
            alt="Headshot of Gavin Grant"
            priority={true}
            className="block rounded-full shadow-lg shadow-neutral-700 dark:hidden"
            width={260}
            height={260}
            placeholder="blur"
          />
          <Image
            src={headshotLight}
            alt="Headshot of Gavin Grant"
            priority={true}
            className="hidden rounded-full shadow-lg shadow-neutral-400 dark:block"
            width={260}
            height={260}
            placeholder="blur"
          />
        </motion.div>
      </div>
    </div>
  )
}

export default About
