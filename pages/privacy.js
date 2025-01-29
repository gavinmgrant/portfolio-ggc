import Head from 'next/head'
import PrivacyPolicy from '../components/PrivacyPolicy'

export default function Privacy() {
  return (
    <div>
      <Head>
        <title>Privacy Policy</title>
        <meta name="description" content="Privacy Policy" />
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className="mx-auto max-w-[1536px] antialiased">
        <PrivacyPolicy />
      </main>
    </div>
  )
}
