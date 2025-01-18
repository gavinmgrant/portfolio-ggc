import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import { HeroUIProvider } from '@heroui/react'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen pt-2 dark:bg-neutral-900">
      <HeroUIProvider>
        <ThemeProvider attribute="class" enableSystem={false}>
          <Navigation />
          <Component {...pageProps} />
          <Footer />
        </ThemeProvider>
      </HeroUIProvider>
    </div>
  )
}

export default MyApp
