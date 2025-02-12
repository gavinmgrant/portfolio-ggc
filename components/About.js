import Image from 'next/image'
import { useRouter } from 'next/router'
import headshotDark from '../public/images/headshot-dark.jpg'
import { motion } from 'motion/react'
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons'
import { Button } from '@heroui/react'
import { urls } from '../configs/urls.config'

const About = () => {
  const router = useRouter()

  return (
    <>
      <div className="my-20 flex h-full max-w-[1536px] items-center justify-center sm:my-28 lg:my-0 lg:h-screen lg:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex max-w-[1000px] flex-col-reverse items-center justify-center gap-8 text-center lg:flex-row lg:gap-20 lg:text-left"
        >
          <div>
            <h1 className="text-5xl font-semibold text-neutral-900 dark:text-white sm:text-6xl lg:text-7xl">
              Hi, I'm Gavin.
            </h1>
            <div className="mt-2 text-neutral-800 dark:text-white lg:mt-6">
              <p className="text-left text-sm lg:text-base">
                As a forward-thinking front-end software engineer with a
                background in architecture, I bring a unique perspective to
                building engaging, user-centric digital experiences.
                Specializing in JavaScript, TypeScript, React, Next.js, Vue.js,
                Nuxt.js, and more, I help businesses create modern, scalable web
                applications that stand out.
              </p>
              <p className="text-left text-sm lg:text-base">
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
          <div className="mb-0 flex-shrink-0 lg:mb-10 lg:mt-12 lg:pl-4">
            <Image
              src={headshotDark}
              alt="Headshot of Gavin Grant"
              priority={true}
              className="rounded-full"
              width={260}
              height={260}
              placeholder="blur"
            />
          </div>
        </motion.div>
      </div>
    </>
  )
}

export default About
