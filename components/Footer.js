import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { IconBrandLinkedin, IconBrandGithub, IconMail } from '@tabler/icons'
import { urls } from '../configs/urls.config'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <>
      <hr className="dark:border-white-300 border-t-[0.5px] border-neutral-300 mt-12" />

      <div className="mx-auto mt-0 py-6">
        <div className="relative mx-auto px-4 text-sm text-neutral-800 dark:text-white lg:max-w-6xl">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="flex flex-col space-x-0 space-y-3 pt-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:pt-0">
              <motion.a
                href={urls.linkedin}
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
                href={urls.github}
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
                href={urls.email}
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
    </>
  )
}

export default Footer
