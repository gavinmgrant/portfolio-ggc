import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'motion/react'
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react'
import { Button } from '@heroui/react'
import { urls } from '../configs/urls.config'

const TITLE = 'Crafting performant, modern web apps.'
const DESCRIPTION =
  'Frontend engineer focused on crafting scalable, maintainable experiences with React, Next.js, Vue, and TypeScript — where usability and performance meet thoughtful design.'

const About = () => {
  const router = useRouter()
  const [isHovered, setIsHovered] = useState(true)

  const logoSpring = {
    type: 'spring',
    stiffness: 300,
    damping: 50,
    ease: 'easeInOut',
    duration: 500,
  }

  useEffect(() => {
    setTimeout(() => setIsHovered(false), 3000)
  }, [])

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
          strokeWidth="42"
          strokeLinecap="round"
          strokeLinejoin="round"
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
          strokeWidth="42"
          strokeLinecap="round"
          strokeLinejoin="round"
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
          strokeWidth="42"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  )

  const handleHover = (hovered) => {
    setIsHovered(hovered)
  }

  return (
    <>
      <div className="my-20 flex h-full max-w-[1536px] items-center justify-center sm:my-28 lg:my-0 lg:h-screen lg:pt-[88px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex max-w-[900px] flex-col-reverse items-center justify-center gap-4 text-left sm:gap-6 md:gap-8 lg:flex-row xl:gap-20"
        >
          <div>
            <h1 className="heading-size-lg !leading-1 font-semibold text-neutral-900 dark:text-white">
              {TITLE}
            </h1>
            <div className="mt-2 text-neutral-800 dark:text-white lg:mt-4">
              <p className="text-sm lg:text-base">{DESCRIPTION}</p>
            </div>
            <div className="mt-4 flex w-full gap-2 sm:h-12 sm:gap-4 lg:mt-6 lg:justify-start lg:gap-5">
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
                    size="md"
                    className="block sm:hidden"
                  >
                    Contact
                  </Button>
                  <Button
                    onPress={() => router.push('/contact')}
                    color="primary"
                    radius="sm"
                    size="lg"
                    className="hidden sm:block"
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
                    size="md"
                    className="block sm:hidden"
                    variant="bordered"
                  >
                    Projects
                  </Button>
                  <Button
                    onPress={() => router.push('/projects')}
                    radius="sm"
                    size="lg"
                    className="hidden sm:block"
                    variant="bordered"
                  >
                    View Projects
                  </Button>
                </motion.div>
              </motion.div>
              <div className="flex items-center justify-center gap-2 sm:gap-4 lg:gap-5">
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
                    <Button
                      isIconOnly
                      radius="sm"
                      size="md"
                      className="flex items-center justify-center sm:hidden"
                      variant="bordered"
                    >
                      <IconBrandLinkedin className="h-6 w-6" />
                    </Button>
                    <Button
                      isIconOnly
                      radius="sm"
                      size="lg"
                      className="hidden items-center justify-center sm:flex"
                      variant="bordered"
                    >
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
                    <Button
                      isIconOnly
                      radius="sm"
                      size="md"
                      className="flex items-center justify-center sm:hidden"
                      variant="bordered"
                    >
                      <IconBrandGithub className="h-6 w-6" />
                    </Button>
                    <Button
                      isIconOnly
                      radius="sm"
                      size="lg"
                      className="hidden items-center justify-center sm:flex"
                      variant="bordered"
                    >
                      <IconBrandGithub className="h-7 w-7" />
                    </Button>
                  </motion.div>
                </motion.a>
              </div>
            </div>
          </div>
          <div
            className="mb-0 flex w-[148px] scale-85 items-center justify-center sm:w-[200px] md:w-[224px] lg:mb-10 lg:mt-12 lg:w-[264px] lg:scale-100 lg:pl-2"
            onMouseEnter={() => handleHover(true)}
            onMouseLeave={() => handleHover(false)}
          >
            <div className="relative mt-16 flex flex-col items-center justify-center lg:mt-0">
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
