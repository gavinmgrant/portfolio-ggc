import Link from 'next/link'
import { useEffect, useState } from 'react'
import ThemeSwitch from './ThemeSwitch'
import LogoHeader from './LogoHeader'
import { useTheme } from 'next-themes'
import { IconMenu2, IconPoint } from '@tabler/icons'
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
    <div className="dark:border-white-300 fixed top-0 z-50 mx-auto mb-12 w-screen border-b-[0.5px] border-neutral-200 bg-white dark:border-neutral-600 dark:bg-neutral-900">
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
        >
          <DrawerContent>
            {(onClose) => (
              <DrawerBody className="px-8 py-12">
                <div className="flex flex-col items-center justify-center gap-6">
                  <Link href="/projects" className="hover-color">
                    <span className={underlineClass} onClickCapture={onClose}>
                      Projects
                    </span>
                  </Link>
                  <Link href="/contact" className="hover-color">
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
            <Link href="/projects" className="hover-color">
              <span className={underlineClass}>Projects</span>
            </Link>
            <Link href="/contact" className="hover-color">
              <span className={underlineClass}>Contact</span>
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
