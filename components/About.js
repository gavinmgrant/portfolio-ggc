import React from 'react'
import Image from 'next/image'
import profile from '../public/headshot.png'

const About = () => {
  return (
    <div className="container mx-auto my-20 flex h-full max-w-xl items-center justify-center px-4 lg:my-0 lg:h-screen lg:max-w-5xl">
      <div className="item-center flex flex-col-reverse text-center lg:mx-4 lg:flex-row lg:items-center lg:text-left">
        <div className="lg:px-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white lg:text-5xl">
            Hi there, I'm Gavin.
          </h1>
          <div className="mt-6 text-gray-800 dark:text-white">
            <p className="mb-4">
              I'm a software engineer at{' '}
              <a href="https://sessionslive.com/" target="_blank">
                Sessions
              </a>
              , a live video streaming service that connects musicians to a
              global audience.
            </p>
          </div>
          <button className="btn-primary mt-2">
            <a href="/projects">View Projects</a>
          </button>
        </div>
        <div className="mb-10 flex-shrink-0 lg:mt-12 lg:pl-10">
          <Image
            src={profile}
            alt="Profile"
            priority={true}
            className="rounded-full"
            width={250}
            height={250}
            placeholder="blur"
          />
        </div>
      </div>
    </div>
  )
}

export default About
