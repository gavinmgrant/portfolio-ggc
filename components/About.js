import Image from 'next/image'
import { useRouter } from 'next/router'
import headshotDark from '../public/images/headshot-dark.jpg'
import { motion } from 'motion/react'
import { IconBrandLinkedin, IconBrandGithub } from '@tabler/icons-react'
import { Button } from '@heroui/react'
import { urls } from '../configs/urls.config'

const About = () => {
  const router = useRouter()

  return (
    <>
      <div className="my-20 flex h-full max-w-[1536px] items-center justify-center sm:my-28 lg:my-0 lg:h-screen lg:pt-[88px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex max-w-[965px] flex-col-reverse items-center justify-center gap-4 text-center sm:gap-6 md:gap-8 lg:flex-row lg:gap-20 lg:text-left"
        >
          <div>
            <h1 className="heading-size-lg font-semibold text-neutral-900 dark:text-white">
              Building fast, scalable websites and web apps
            </h1>
            <div className="mt-2 text-neutral-800 dark:text-white lg:mt-4">
              <p className="ftext-sm lg:text-base">
                I specialize in creating high-performance, scalable websites and
                web applications that deliver exceptional digital experiences.
                With expertise in modern frontend technologies like Next.js,
                Vue.js, TypeScript, and Sanity, I build fast, dynamic solutions
                tailored to your business needs. Whether you're looking for a
                sleek marketing site, a powerful web application, or anything in
                between, I focus on delivering innovative, user-friendly
                solutions that not only meet your goals but also ensure
                seamless, engaging experiences for your users.
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
          <div className="mb-0 w-[148px] flex-shrink-0 sm:w-[200px] md:w-[224px] lg:mb-10 lg:mt-12 lg:w-[264px] lg:pl-2">
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
