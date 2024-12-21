import React from 'react'
import Image from 'next/image'
import headshotDark from '../public/images/headshot-dark.jpg'
import headshotLight from '../public/images/headshot-light.jpg'
import { motion } from 'framer-motion'
import {
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
  IconBrandGit,
} from '@tabler/icons'
import { urls } from '../configs/urls.config'

const About = () => {
  return (
    <div className="container mx-auto my-20 flex h-full max-w-3xl items-center justify-center px-4 lg:my-0 lg:h-screen lg:max-w-6xl">
      <div className="flex flex-col-reverse items-center justify-center gap-8 text-center lg:mx-4 lg:flex-row lg:gap-20 lg:text-left">
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
            <p className="mb-4 text-justify">
              I'm a forward-thinking software engineer, specializing in
              front-end development. With a background in architecture, I bring
              a unique perspective to crafting captivating digital experiences.
              Armed with expertise in JavaScript, TypeScript, React, Next.js,
              Vue.js, Nuxt.js, Node.js, Express, and more.
            </p>
            <p className="mb-4 text-justify">
              Currently, I'm the driving force behind front-end engineering at{' '}
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
          <div className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row lg:mt-6 lg:justify-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 4.3 }}
            >
              <a href="/projects">
                <motion.button
                  className="btn-primary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  View Projects
                </motion.button>
              </a>
            </motion.div>
            <div className="flex items-center justify-center gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4.4 }}
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
                transition={{ delay: 4.5 }}
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
                transition={{ delay: 4.6 }}
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
