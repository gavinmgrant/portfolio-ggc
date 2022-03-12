import Link from 'next/link'
import React from 'react'
import ThemeSwitch from './ThemeSwitch'

const Navigation = () => {
  return (
    <div className="fixed w-screen top-0 z-20 mx-auto flex items-center justify-between bg-white py-3 pl-4 pr-3 dark:bg-black lg:py-6">
      <Link href="/">
        <a
          className={
            'uppercase tracking-wider text-gray-900 transition-colors hover:text-yellow-500 dark:text-white dark:hover:text-yellow-500'
          }
        >
          Gavin Grant
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
  )
}

export default Navigation
