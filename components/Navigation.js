import Link from 'next/link'
import React from 'react'
import ThemeSwitch from './ThemeSwitch'
import LogoHeader from './LogoHeader'
import { useTheme } from 'next-themes'

const Navigation = () => {
  const { theme } = useTheme()

  return (
    <div className="fixed top-0 z-20 mx-auto w-screen bg-white dark:bg-black">
      <div className="mx-auto flex items-center justify-between py-3 pl-4 pr-3 lg:max-w-6xl lg:py-6">
        <Link href="/">
          <a className="transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500">
            <LogoHeader />
          </a>
        </Link>
        <div className="flex items-center">
          <a
            href="/projects"
            className="transition-colors duration-500 hover:text-yellow-600 dark:hover:text-yellow-500"
            rel="noreferrer"
          >
            <span
              className={`link-underline ${
                theme === 'dark'
                  ? 'link-underline-dark'
                  : 'link-underline-light'
              }`}
            >
              Projects
            </span>
          </a>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}

export default Navigation
