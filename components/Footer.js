import React from 'react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { IconBrandLinkedin, IconBrandGithub, IconPlus } from '@tabler/icons-react'
import { urls } from '../configs/urls.config'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div className="light-border w-screen border-t-[0.5px]">
      <div className="side-borders relative mx-auto max-w-[1536px] p-4 sm:p-6">
        <div className="bg-standard absolute -left-2 -top-2">
          <IconPlus
            size="15px"
            className="hidden text-neutral-300 dark:text-neutral-500 2xl:block"
          />
        </div>

        <div className="relative mx-auto text-sm text-neutral-800 dark:text-white">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex flex-col space-x-0 space-y-3 pt-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:pt-0">
              <motion.a
                href={urls.linkedin}
                className="flex items-center space-x-1 hover-color"
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
                className="flex items-center space-x-1 hover-color"
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
            </div>
            <div className="mt-6 flex flex-col items-center text-sm sm:mt-0 sm:flex-row">
              <Link
                href="/privacy"
                target="_blank"
                className="hover-color"
              >
                Privacy Policy
              </Link>
              <p className="py-0.5 lg:ml-3">© {year} Gavin Grant Consulting</p>
            </div>
          </div>
        </div>

        <div className="bg-standard absolute -right-2 -top-2">
          <IconPlus
            size="15px"
            className="hidden text-neutral-300 dark:text-neutral-500 2xl:block"
          />
        </div>
      </div>
    </div>
  )
}

export default Footer
