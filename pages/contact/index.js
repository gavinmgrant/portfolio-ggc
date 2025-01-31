import Head from 'next/head'
import ogImage from '../../public/images/gavin-grant-og.png'
import ContactForm from '../../components/ContactForm'

export default function Contact() {
  const description =
    'Contact Gavin Grant Consulting to discuss your project or to learn more about our web development services. We can build your website or web app.'

  return (
    <div className="side-borders mx-auto w-full px-4 pb-4 pt-[72px] sm:min-h-screen sm:px-6 sm:pb-6 sm:pt-[104px] lg:pt-0 2xl:max-w-[1536px]">
      <Head>
        <title>Contact | Gavin Grant Consulting</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Gavin Grant" />
        <meta property="og:title" content="Contact" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage.src} />
      </Head>

      <div className="flex items-start justify-center lg:h-screen lg:items-center">
        <ContactForm />
      </div>
    </div>
  )
}
