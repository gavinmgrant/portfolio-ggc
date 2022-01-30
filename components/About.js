import React from 'react'
import Image from 'next/image'
import profile from '../public/headshot.jpg'

const About = () => {
  return (
    <div className="container mx-auto px-4 py-24 mt-0 lg:mt-6 max-w-5xl">
      <div className="item-center flex flex-col-reverse text-center lg:mx-4 lg:flex-row lg:text-left lg:items-center">
        <div className="lg:px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-5xl">
            Hi there, I'm Gavin.
          </h1>
          <div className="mt-6 text-gray-800 dark:text-white">
            <p className="mb-4">
              I'm a developer leveraging his architecture background to utilize JavaScript, TypeScript, React, Next.js, Node.js, Express, and other modern web development frameworks.
            </p>
          </div>
        </div>
        <div className="mb-10 flex-shrink-0 lg:mt-12 lg:px-4">
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
