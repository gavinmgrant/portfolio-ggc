import { NextSeo } from 'next-seo'
import About from '../components/About'
import Testimonials from '../components/Testimonials'
import Divider from '../components/Divider'
import ContactForm from '../components/ContactForm'
import ogImage from '../public/images/gavin-grant-og.png'

export default function Home() {
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  const description =
    'Gavin Grant Consulting specializes in building fast, scalable websites and web applications that stand out.'

  return (
    <>
      <NextSeo
        title="Gavin Grant Consulting"
        description={description}
        canonical={SITE_URL}
        openGraph={{
          url: SITE_URL,
          title: 'Gavin Grant Consulting',
          description: description,
          images: [
            {
              url: ogImage.src,
              alt: 'Gavin Grant Consulting',
            },
          ],
          site_name: 'Gavin Grant Consulting',
        }}
      />
      <div className="mx-auto flex max-w-[1536px] flex-col items-center justify-center px-4 antialiased sm:px-6">
        <About />
        <Divider />
        <Testimonials />
        <Divider />
        <div className="flex w-full items-center justify-center pb-8 lg:min-h-[calc(100vh-168px)] lg:pb-28">
          <ContactForm />
        </div>
      </div>
    </>
  )
}
