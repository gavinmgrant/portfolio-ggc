import Link from 'next/link'
import React from 'react'
import ThemeSwitch from './ThemeSwitch'
import LogoHeader from './LogoHeader'

const Navigation = () => {
  return (
    <div className="fixed top-0 z-20 mx-auto w-screen bg-white dark:bg-black">
      <div className="flex items-center justify-between mx-auto py-3 pl-4 pr-3 lg:py-6 lg:max-w-6xl">
        <Link href="/">
          <a
            className={
              'uppercase tracking-wider text-gray-900 transition-colors hover:text-yellow-500 dark:text-white dark:hover:text-yellow-500'
            }
          >
            <LogoHeader />
          </a>
        </Link>
        <div className="flex items-center">
          <a
            href="/projects"
            className={'transition-colors hover:text-yellow-500'}
            rel="noreferrer"
          >
            Projects
          </a>
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}

export default Navigation
