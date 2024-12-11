import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  IconBrandTwitter,
  IconBrandLinkedin,
  IconBrandGithub,
  IconMail,
} from '@tabler/icons'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div className="mx-auto mt-0 pt-12 pb-6">
      <div className="mx-auto px-4 text-sm text-neutral-800 dark:text-white lg:max-w-6xl">
        <div className="dark:border-white-300 mb-4 border-t-2 border-neutral-300"></div>
        <div className="flex flex-col items-center justify-between lg:flex-row gap-4">
          <div className="flex flex-col space-y-3 space-x-0 pt-2 sm:flex-row sm:space-y-0 sm:space-x-4 sm:pt-0">
            <motion.a
              href="https://www.linkedin.com/in/gavinmgrant/"
              className="flex items-center space-x-1 transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
            >
              <IconBrandLinkedin />
              <div className="overflow-hidden text-clip">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2, type: 'spring', bounce: 0.1 }}
                  viewport={{ once: true }}
                >
                  LinkedIn
                </motion.div>
              </div>
            </motion.a>
            <motion.a
              href="https://github.com/gavinmgrant"
              className="flex items-center space-x-1 transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.05 }}
            >
              <IconBrandGithub />
              <div className="overflow-hidden text-clip">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, type: 'spring', bounce: 0.1 }}
                  viewport={{ once: true }}
                >
                  GitHub
                </motion.div>
              </div>
            </motion.a>

            <motion.a
              href="mailto:gavin@gavingrant.com?subject=Hi Gavin!"
              className="flex items-center space-x-1 transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
              whileHover={{ scale: 1.05 }}
            >
              <IconMail />
              <div className="overflow-hidden text-clip">
                <motion.div
                  initial={{ x: -30, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, type: 'spring', bounce: 0.1 }}
                  viewport={{ once: true }}
                >
                  Email
                </motion.div>
              </div>
            </motion.a>
          </div>
          <div className="mt-6 flex flex-col items-center text-sm lg:mt-0 lg:flex-row">
            <Link
              href="/privacy"
              target="_blank"
              className="transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
            >
              Privacy Policy
            </Link>
            <p className="lg:ml-3">© {year} Gavin Grant Consulting</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
