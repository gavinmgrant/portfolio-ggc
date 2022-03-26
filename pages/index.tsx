import { useState } from 'react';
import Head from 'next/head'
import Logo from '../components/Logo';
import About from '../components/About'

export default function Home() {
  const [isVisible, setIsVisible] = useState(true);

  setTimeout(() => {
    setIsVisible(false);
  }, 6000);

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
        {isVisible && <Logo />}
        <About />
      </main>
    </div>
  )
}
