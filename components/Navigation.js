import Link from 'next/link'
import { useEffect, useState } from 'react'
import ThemeSwitch from './ThemeSwitch'
import LogoHeader from './LogoHeader'
import { useTheme } from 'next-themes'

const Navigation = () => {
  const { theme } = useTheme()
  const [underlineClass, setUnderlineClass] = useState(
    'link-underline link-underline-light'
  )

  useEffect(() => {
    if (theme === 'dark') {
      setUnderlineClass('link-underline link-underline-dark')
    } else {
      setUnderlineClass('link-underline link-underline-light')
    }
  }, [theme])

  return (
    <div className="dark:border-white-300 fixed top-0 z-20 mx-auto mb-12 w-screen border-b-[0.5px] border-neutral-300 bg-white dark:bg-neutral-900">
      <div className="mx-auto flex items-center justify-between px-4 py-3 lg:max-w-6xl lg:py-6">
        <Link
          href="/"
          className="transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
        >
          <LogoHeader />
        </Link>
        <div className="flex items-center gap-4 lg:gap-5">
          <Link
            href="/projects"
            className="text-sm transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500 lg:text-base"
          >
            <span className={underlineClass}>Projects</span>
          </Link>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}

export default Navigation
