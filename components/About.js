import React from 'react'
import Image from 'next/image'
import profile from '../public/headshot.png'

const About = () => {
  return (
    <div className="container mx-auto my-20 max-w-xl lg:max-w-5xl px-4 h-full lg:my-0 lg:h-screen flex justify-center items-center">
      <div className="item-center flex flex-col-reverse text-center lg:mx-4 lg:flex-row lg:items-center lg:text-left">
        <div className="lg:px-4">
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white lg:text-5xl">
            Hi there, I'm Gavin.
          </h1>
          <div className="mt-6 text-gray-800 dark:text-white">
            <p className="mb-4">
              I'm a developer leveraging his architecture background to utilize
              JavaScript, TypeScript, React, Next.js, Node.js, Express, and
              other modern web development frameworks.
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
