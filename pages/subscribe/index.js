import Head from 'next/head'
import ogImage from '../../public/images/gavin-grant-og.png'
import NewsletterSubscribe from '../../components/NewsletterSubscribe'

function Subscribe() {
  const description =
    'Subscribe for practical deep-dives on frontend engineering and building AI tools — React, Next.js, and production-ready products. One email per month.'

  return (
    <div className="page-padding-no-top w-full sm:min-h-screen 2xl:max-w-[1536px]">
      <Head>
        <title>Subscribe | Gavin Grant Consulting</title>
        <meta name="description" content={description} />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="author" content="Gavin Grant" />
        <meta property="og:site_name" content="Gavin Grant Consulting" />
        <meta property="og:title" content="Subscribe" />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage.src} />
      </Head>

      <div className="flex items-start justify-center px-4 lg:h-screen lg:items-center">
        <NewsletterSubscribe />
      </div>
    </div>
  )
}

Subscribe.hideFooterNewsletter = true

export default Subscribe
