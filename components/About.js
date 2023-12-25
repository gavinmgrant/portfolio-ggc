import React from 'react'
import Image from 'next/image'
import headshotDark from '../public/images/headshot-dark.jpg'
import headshotLight from '../public/images/headshot-light.jpg'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className="container mx-auto my-20 flex h-full max-w-xl items-center justify-center px-4 lg:my-0 lg:h-screen lg:max-w-5xl">
      <div className="flex flex-col-reverse items-center justify-center text-center lg:mx-4 lg:flex-row lg:text-left">
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
            className="mt-2 lg:mt-6 text-neutral-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4 }}
          >
            <p className="mb-4">
              I'm a software engineer leveraging my architecture background to
              utilize JavaScript, TypeScript, React, Next.js, Vue.js, Nuxt.js, Node.js, Express,
              and other modern web development frameworks.
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
          className="mb-6 lg:mb-10 flex-shrink-0 lg:mt-12 lg:pl-4"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5 }}
        >
          <Image
            src={headshotDark}
            alt="Headshot of Gavin Grant"
            priority={true}
            className="rounded-full hidden dark:block shadow-lg shadow-neutral-700"
            width={260}
            height={260}
            placeholder="blur"
          />
          <Image
            src={headshotLight}
            alt="Headshot of Gavin Grant"
            priority={true}
            className="rounded-full dark:hidden block shadow-lg shadow-neutral-400"
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
