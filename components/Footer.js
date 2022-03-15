import React from 'react'
import Link from 'next/link'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div className="mx-auto py-12">
      <div className="mx-auto px-4 text-gray-800 dark:text-white lg:max-w-6xl">
        <div className="dark:border-white-300 mb-4 border-t-2 border-gray-300"></div>
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <div className="flex flex-wrap space-x-2 pt-2 sm:space-x-4 lg:pt-0">
            <a
              href="https://twitter.com/higavingrant"
              className={'transition-colors hover:text-yellow-500'}
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://www.linkedin.com/in/gavinmgrant/"
              className={'transition-colors hover:text-yellow-500'}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/gavinmgrant"
              className={'transition-colors hover:text-yellow-500'}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>
          <div className="flex items-center mt-3 lg:mt-0 text-sm">
            <Link
              href="/privacy"
              target="_blank"
            >
              Privacy Policy
            </Link>
            <p className="ml-3">
              © {year} Gavin Grant Consulting
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
