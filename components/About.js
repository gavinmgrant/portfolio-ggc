import React from 'react'
import Image from 'next/image'
import headshotDark from '../public/images/headshot-dark.jpg'
import { motion } from 'framer-motion'
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
} from '@tabler/icons'
import { urls } from '../configs/urls.config'

const About = () => {
  return (
    <div className="container mx-auto my-20 flex h-full max-w-3xl items-center justify-center px-4 lg:my-0 lg:h-screen lg:max-w-6xl lg:px-0">
      <div className="flex flex-col-reverse items-center justify-center gap-8 text-center lg:mx-4 lg:flex-row lg:gap-20 lg:text-left">
        <div className="lg:max-w-[660px] lg:px-4">
          <h1
            className="text-4xl font-semibold text-neutral-900 dark:text-white lg:text-5xl"
          >
            Hi, I'm Gavin.
          </h1>
          <div
            className="mt-2 text-neutral-800 dark:text-white lg:mt-6"
          >
            <p className="text-left sm:text-justify">
              As a forward-thinking front-end software engineer with a
              background in architecture, I bring a unique perspective to
              building engaging, user-centric digital experiences. Specializing
              in JavaScript, TypeScript, React, Next.js, Vue.js, Nuxt.js, and
              more, I help businesses create modern, scalable web applications
              that stand out.
            </p>
            <p className="text-left sm:text-justify">
              Currently, I'm leading front-end engineering at{' '}
              <a
                className="font-medium transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
                href="https://happycompanies.com/"
                target="_blank"
              >
                Happy Companies
              </a>
              , where I'm committed to delivering high-quality solutions that
              engage and delight users.
            </p>
          </div>
          <div className="flex w-full flex-col items-center justify-center gap-4 mt-4 sm:flex-row lg:mt-6 lg:justify-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.6 }}
            >
              <a href="/projects">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 2.95 }}
                >
                  View Projects
                </motion.button>
              </a>
            </motion.div>
            <div className="flex items-center justify-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8 }}
              >
                <a href={urls.linkedin} target="_blank">
                  <motion.button
                    className="btn-primary flex h-11 w-11 items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconBrandLinkedin className="shrink-0" />
                  </motion.button>
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3 }}
              >
                <a href={urls.github} target="_blank">
                  <motion.button
                    className="btn-primary flex h-11 w-11 items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconBrandGithub className="shrink-0" />
                  </motion.button>
                </a>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3.2 }}
              >
                <a href={urls.email} target="_blank">
                  <motion.button
                    className="btn-primary flex h-11 w-11 items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconMail className="shrink-0" />
                  </motion.button>
                </a>
              </motion.div>
            </div>
          </div>
        </div>
        <div
          className="mb-6 flex-shrink-0 lg:mb-10 lg:mt-12 lg:pl-4"
        >
          <Image
            src={headshotDark}
            alt="Headshot of Gavin Grant"
            priority={true}
            className="rounded-full shadow-lg shadow-neutral-700"
            width={260}
            height={260}
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  )
}

export default About
