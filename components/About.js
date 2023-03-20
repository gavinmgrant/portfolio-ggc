import React from 'react'
import Image from 'next/image'
import profile from '../public/headshot.png'
import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className="container mx-auto my-20 flex h-full max-w-xl items-center justify-center px-4 lg:my-0 lg:h-screen lg:max-w-5xl">
      <div className="flex flex-col-reverse items-center justify-center text-center lg:mx-4 lg:flex-row lg:text-left">
        <div className="lg:px-4">
          <motion.h1
            className="text-4xl font-semibold text-stone-900 dark:text-white lg:text-5xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.75 }}
          >
            Hi there, I'm Gavin.
          </motion.h1>
          <motion.div
            className="mt-2 lg:mt-6 text-gray-800 dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 4 }}
          >
            <p className="mb-4">
              I'm a software engineer leveraging my architecture background to
              utilize JavaScript, TypeScript, React, Next.js, Node.js, Express,
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
          initial={{ opacity: 0, scale: 0.25 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.5 }}
        >
          <Image
            src={profile}
            alt="Profile"
            priority={true}
            className="rounded-full"
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
