import Link from 'next/link'
import { useEffect, useState } from 'react'
import ThemeSwitch from './ThemeSwitch'
import LogoHeader from './LogoHeader'
import { useTheme } from 'next-themes'
import { IconMenu2 } from '@tabler/icons'
import { Drawer, DrawerContent, DrawerBody, useDisclosure } from '@heroui/react'

const Navigation = () => {
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

  return (
    <div className="dark:border-white-300 fixed top-0 z-20 mx-auto mb-12 w-screen border-b-[0.5px] border-neutral-300 bg-white dark:bg-neutral-900">
      <div className="mx-auto flex items-center justify-between px-4 py-4 sm:max-w-6xl sm:py-6">
        <Link
          href="/"
          className="transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
        >
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
        >
          <DrawerContent>
            {(onClose) => (
              <DrawerBody className="px-8 py-12">
                <div className="flex flex-col items-center justify-center gap-6">
                  <Link
                    href="/projects"
                    className="transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
                  >
                    <span className={underlineClass} onClickCapture={onClose}>
                      Projects
                    </span>
                  </Link>
                  <Link
                    href="/contact"
                    className="transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
                  >
                    <span className={underlineClass} onClickCapture={onClose}>
                      Contact
                    </span>
                  </Link>
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
            <Link
              href="/projects"
              className="transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
            >
              <span className={underlineClass}>Projects</span>
            </Link>
            <Link
              href="/contact"
              className="transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
            >
              <span className={underlineClass}>Contact</span>
            </Link>
            <ThemeSwitch />
          </div>
        </div>
        {/* Desktop Menu */}
      </div>
    </div>
  )
}

export default Navigation
