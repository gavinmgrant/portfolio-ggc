import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import ThemeSwitch from './ThemeSwitch'
import LogoHeader from './LogoHeader'
import { useTheme } from 'next-themes'
import { Button } from '@heroui/react'
import { IconMenu2, IconPoint, IconX } from '@tabler/icons'
import { Drawer, DrawerContent, DrawerBody, useDisclosure } from '@heroui/react'

const Navigation = () => {
  const router = useRouter()
  const { theme } = useTheme()
  const [underlineClass, setUnderlineClass] = useState(
    'link-underline link-underline-light'
  )
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  useEffect(() => {
    if (theme === 'dark') {
      setUnderlineClass('link-underline link-underline-dark')
    } else {
      setUnderlineClass('link-underline link-underline-light')
    }
  }, [theme])

  const CustomCloseButton = (
    <div>
      <IconX className="text-neutral-900 dark:text-white" />
    </div>
  )

  return (
    <div className="dark:border-white-300 light-border fixed top-0 z-50 mx-auto mb-12 w-screen border-b-[0.5px] bg-white dark:bg-neutral-900">
      <div className="side-borders relative mx-auto flex max-w-[1536px] items-center justify-between p-4 sm:p-6">
        <div className="absolute -bottom-2 -left-2">
          <IconPoint
            size="15px"
            className="hidden text-neutral-300 dark:text-neutral-500 2xl:block"
          />
        </div>

        <Link href="/" className="hover-color">
          <LogoHeader />
        </Link>
        {/* Mobile Menu */}
        <IconMenu2
          className="block cursor-pointer sm:hidden"
          onClick={onOpen}
        />
        <Drawer
          placement="right"
          backdrop="blur"
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          closeButton={CustomCloseButton}
        >
          <DrawerContent>
            {(onClose) => (
              <DrawerBody className="px-8 py-14">
                <div className="flex flex-col items-center justify-center gap-5">
                  <Button
                    className="w-full"
                    onPress={() => {
                      onClose()
                      router.push('/')
                    }}
                    variant="bordered"
                    radius="sm"
                    size="lg"
                  >
                    Home
                  </Button>
                  <Button
                    className="w-full"
                    onPress={() => {
                      onClose()
                      router.push('/projects')
                    }}
                    variant="bordered"
                    radius="sm"
                    size="lg"
                  >
                    Projects
                  </Button>
                  <Button
                    className="w-full"
                    onPress={() => {
                      onClose()
                      router.push('/contact')
                    }}
                    variant="bordered"
                    radius="sm"
                    size="lg"
                  >
                    Contact
                  </Button>
                  <ThemeSwitch />
                </div>
              </DrawerBody>
            )}
          </DrawerContent>
        </Drawer>
        {/* Mobile Menu */}
        {/* Desktop Menu */}
        <div className="hidden sm:block">
          <div className="flex flex-row items-center justify-center gap-5">
            <Link href="/projects" className="hover-color">
              <span className="link-underline link-underline-light dark:link-underline-dark">
                Projects
              </span>
            </Link>
            <Link href="/contact" className="hover-color">
              <span className="link-underline link-underline-light dark:link-underline-dark">
                Contact
              </span>
            </Link>
            <ThemeSwitch />
          </div>
        </div>

        <div className="absolute -bottom-2 -right-2">
          <IconPoint
            size="15px"
            className="hidden text-neutral-300 dark:text-neutral-500 2xl:block"
          />
        </div>
        {/* Desktop Menu */}
      </div>
    </div>
  )
}

export default Navigation
