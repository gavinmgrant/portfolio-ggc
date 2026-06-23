import { useEffect, lazy, Suspense } from 'react'
import Script from 'next/script'
import { useRouter } from 'next/router'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import RouteProgress from '../components/RouteProgress'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { HeroUIProvider } from '@heroui/react'
import { VisualEditing } from '@sanity/visual-editing/next-pages-router'
import {
  jetbrainsMono,
  libreBaskerville,
  outfit,
  plusJakartaSans,
} from '@/lib/fonts'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'

export interface SharedPageProps {
  draftMode: boolean
  token: string
  hideFooterNewsletter?: boolean
}

type AppPageComponent = AppProps['Component'] & {
  hideFooterNewsletter?: boolean
}

const PreviewProvider = lazy(() => import('@/components/PreviewProvider'))

const fontVariables = `${plusJakartaSans.variable} ${libreBaskerville.variable} ${outfit.variable} ${jetbrainsMono.variable}`

function MyApp({ Component, pageProps }: AppProps<SharedPageProps>) {
  const { draftMode, token, hideFooterNewsletter } = pageProps
  const PageComponent = Component as AppPageComponent
  const showFooterNewsletter =
    !hideFooterNewsletter && !PageComponent.hideFooterNewsletter

  const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

  const router = useRouter()

  useEffect(() => {
    document.documentElement.classList.add(
      plusJakartaSans.variable,
      libreBaskerville.variable,
      outfit.variable,
      jetbrainsMono.variable
    )
    document.body.classList.add(plusJakartaSans.className)
  }, [])

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      // Google Tag Manager
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: 'pageview', page: url })
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <div
      className={`${fontVariables} ${plusJakartaSans.className} relative min-h-screen dark:bg-neutral-900`}
    >
      <RouteProgress />
      <HeroUIProvider>
        <ThemeProvider
          attribute="class"
          enableSystem={false}
          defaultTheme="dark"
        >
          {/* Google Tag Manger */}
          <Script
            id="gtm-script"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                })(window,document,'script','dataLayer','${GTM_ID}');`,
            }}
          />
          <Navigation />
          <div className="side-borders mx-auto min-h-screen 2xl:max-w-[1536px]">
            {draftMode ? (
              <PreviewProvider token={token}>
                <Component {...pageProps} />
                <Suspense>
                  <VisualEditing />
                </Suspense>
              </PreviewProvider>
            ) : (
              <Component {...pageProps} />
            )}
          </div>
          <Footer showNewsletterSubscribe={showFooterNewsletter} />
        </ThemeProvider>
      </HeroUIProvider>
    </div>
  )
}

export default MyApp
