import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="dark:bg-stone-900 min-h-screen pt-2">
      <ThemeProvider attribute="class" enableSystem={false}>
        <Navigation />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </div>
  )
}

export default MyApp
