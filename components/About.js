import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'motion/react'
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react'
import { Button } from '@heroui/react'
import { urls } from '../configs/urls.config'
import { delay } from 'motion'

const About = () => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(false)

  const logoSpring = {
    type: 'spring',
    stiffness: 300,
    damping: 50,
    ease: 'easeInOut',
    duration: 1,
  }

  const LogoLeft = () => (
    <motion.div
      className="w-[86.4px] text-black dark:text-white"
      animate={isHovered ? { x: -8, y: 8 } : { x: 8, y: 0 }}
      transition={logoSpring}
    >
      <svg viewBox="0 0 216 342" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M194.205 121L21 21V221L194.205 321V221L96.7772 164.75"
          stroke="currentColor"
          stroke-width="42"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </motion.div>
  )
  const LogoRight = () => (
    <motion.div
      className="w-[86.4px] text-black dark:text-white"
      animate={isHovered ? { x: 8, y: 8 } : { x: -8, y: 0 }}
      transition={logoSpring}
    >
      <svg viewBox="0 0 216 342" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M194.205 21.0035L21 121.004V321.004L194.205 221.004"
          stroke="currentColor"
          stroke-width="42"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </motion.div>
  )
  const LogoTop = () => (
    <motion.div
      className="absolute -top-12 w-[155.6px] text-black dark:text-white"
      animate={isHovered ? { y: -16 } : { y: 6 }}
      transition={logoSpring}
    >
      <svg viewBox="0 0 389 242" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M367.41 121L194.205 21L21 121L194.205 221L280.808 171L183.38 114.75"
          stroke="currentColor"
          stroke-width="42"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </motion.div>
  )

  const handleHover = (hovered) => {
    if (hovered) {
      setIsHovered(hovered)
    } else {
      setTimeout(() => setIsHovered(hovered), 300)
    }
  }

  return (
    <>
      <div className="my-20 flex h-full max-w-[1536px] items-center justify-center sm:my-28 lg:my-0 lg:h-screen lg:pt-[88px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex max-w-[965px] flex-col-reverse items-center justify-center gap-4 text-center sm:gap-6 md:gap-8 lg:flex-row lg:gap-20 lg:text-left"
        >
          <div>
            <h1 className="heading-size-lg font-semibold text-neutral-900 dark:text-white leading-snug">
              Building web architecture that performs.
            </h1>
            <div className="mt-2 text-neutral-800 dark:text-white lg:mt-4">
              <p className="ftext-sm lg:text-base">
                I build fast, scalable web experiences with React, Next.js, Vue,
                and TypeScript - engineered for performance and tailored to your
                goals.
              </p>
            </div>
            <div className="mt-4 flex w-full flex-col items-center justify-center gap-5 sm:h-12 sm:flex-row lg:mt-6 lg:justify-start">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onPress={() => router.push('/contact')}
                    color="primary"
                    radius="sm"
                    size="lg"
                  >
                    Contact Me
                  </Button>
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    onPress={() => router.push('/projects')}
                    radius="sm"
                    size="lg"
                    variant="bordered"
                  >
                    View Projects
                  </Button>
                </motion.div>
              </motion.div>
              <div className="flex items-center justify-center gap-5">
                <motion.a
                  href={urls.linkedin}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button isIconOnly radius="sm" size="lg" variant="bordered">
                      <IconBrandLinkedin className="h-7 w-7" />
                    </Button>
                  </motion.div>
                </motion.a>
                <motion.a
                  href={urls.github}
                  target="_blank"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button isIconOnly radius="sm" size="lg" variant="bordered">
                      <IconBrandGithub className="h-7 w-7" />
                    </Button>
                  </motion.div>
                </motion.a>
              </div>
            </div>
          </div>
          <div
            className="mb-0 flex w-[148px] items-center justify-center sm:w-[200px] md:w-[224px] lg:mb-10 lg:mt-12 lg:w-[264px] lg:pl-2"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
          >
            <div className="relative mt-16 flex flex-col items-center justify-center pb-8 sm:pb-4 lg:mt-0 lg:pb-0">
              <LogoTop className="" />
              <div className="itemce-center flex">
                <LogoLeft />
                <LogoRight />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default About
