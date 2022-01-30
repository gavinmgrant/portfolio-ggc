import Head from 'next/head'
import About from '../components/About'

export default function Home() {
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
        <link rel="icon" href="/icon.png" />
      </Head>

      <main className="mx-auto max-w-6xl antialiased">
        <About />
      </main>
    </div>
  )
}
