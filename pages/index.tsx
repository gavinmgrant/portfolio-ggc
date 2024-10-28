import { useState, useEffect } from 'react'
import Head from 'next/head'
import Logo from '../components/Logo'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import ogImage from '../public/images/gavin-grant-og.png'

export default function Home() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)

    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div>
      <Head>
        <title>Gavin Grant Consulting</title>
        <meta
          name="description"
          content="Web Design and Development Services"
        />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:title" content="Gavin Grant Consulting" />
        <meta
          property="og:description"
          content="Web Design and Development Services"
        />
        <meta property="og:image" content={ogImage.src} />
        <link rel="icon" href="/icon.png" />
        <link rel="canonical" href="https://www.gavingrant.com" />
      </Head>
      <main className="mx-auto flex max-w-6xl flex-col items-center justify-center antialiased">
        {isVisible && <Logo />}
        <About />
        <Testimonials />
      </main>
    </div>
  )
}
