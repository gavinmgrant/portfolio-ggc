import { useState, useEffect } from 'react'
import Head from 'next/head'
import Logo from '../components/Logo'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import ogImage from '../public/images/gavin-grant-og.png'

export default function Home() {
  const [isIntro, setIsIntro] = useState(true)
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timerIntro = setTimeout(() => {
      setIsIntro(false)
    }, 3500)
    const timerContent = setTimeout(() => {
      setShowContent(true)
    }, 2750)

    return () => {
      clearTimeout(timerIntro)
      clearTimeout(timerContent)
    }
  }, [isIntro, showContent])

  const description =
    'Explore the portfolio of a front-end engineer specializing in Vue & React, offering expert web development and consulting services for modern, scalable apps.'

  return (
    <div>
      <Head>
        <title>Gavin Grant Consulting</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Gavin Grant" />
        <meta property="og:title" content="Gavin Grant Consulting" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage.src} />
        <link rel="icon" href="/icon.png" />
        <link rel="canonical" href="https://www.gavingrant.com" />
      </Head>
      {isIntro && (
        <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center overflow-clip">
          <div className="min-h-screen">
            <Logo />
          </div>
        </div>
      )}
      {showContent && (
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center antialiased">
          <About />
          <Testimonials />
        </div>
      )}
    </div>
  )
}
