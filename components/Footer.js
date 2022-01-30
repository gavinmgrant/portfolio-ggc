import React from 'react'

const Footer = () => {
  const year =  new Date().getFullYear();

  return (
    <div className="mx-auto py-12 sm:py-20">
      <div className="mx-auto lg:max-w-6xl px-4 text-gray-800 dark:text-white">
        <div className="dark:border-white-300 mb-2 border-t-2 border-gray-300 pb-6"></div>
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
          <p className="mt-3 lg:mt-0 text-sm">© {year} Gavin Grant Consulting</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
