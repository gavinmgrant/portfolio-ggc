import Head from 'next/head'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Divider from '../components/Divider'
import ContactForm from '../components/ContactForm'
import ogImage from '../public/images/gavin-grant-og.png'

export default function Home() {
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
        <link rel="canonical" href="https://www.gavingrant.com" />
      </Head>
      <div className="mx-auto flex max-w-[1536px] flex-col items-center justify-center px-4 antialiased sm:px-6">
        <About />
        <Divider />
        <Testimonials />
        <Divider />
        <div className="flex items-center justify-center lg:min-h-[calc(100vh-160px)] pb-8 lg:pb-28 w-full">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}
