import React from 'react'
import Image from 'next/image'
import profile from '../public/headshot.jpg'

const About = () => {
  return (
    <div className="container mx-auto mt-0 max-w-5xl px-4 py-16 sm:py-20 md:py-24 lg:mt-6">
      <div className="item-center flex flex-col-reverse text-center lg:mx-4 lg:flex-row lg:items-center lg:text-left">
        <div className="lg:px-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white lg:text-5xl">
            Hi there, I'm Gavin.
          </h1>
          <div className="mt-6 text-gray-800 dark:text-white">
            <p className="mb-4">
              I'm a developer leveraging his architecture background to utilize
              JavaScript, TypeScript, React, Next.js, Node.js, Express, and
              other modern web development frameworks. Currently, I'm working as
              a front-end developer at AndAlways, an e-commerce company that
              provides uniquely personalized and custom printed gifts.
            </p>
          </div>
          <button className="btn-primary mt-2">
            <a href="/projects">View Projects</a>
          </button>
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
