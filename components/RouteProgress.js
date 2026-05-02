import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export default function RouteProgress() {
  const router = useRouter()
  const [phase, setPhase] = useState('idle')

  useEffect(() => {
    const onStart = () => setPhase('loading')
    const onDone = () => {
      setPhase('complete')
      window.setTimeout(() => setPhase('idle'), 280)
    }

    router.events.on('routeChangeStart', onStart)
    router.events.on('routeChangeComplete', onDone)
    router.events.on('routeChangeError', onDone)

    return () => {
      router.events.off('routeChangeStart', onStart)
      router.events.off('routeChangeComplete', onDone)
      router.events.off('routeChangeError', onDone)
    }
  }, [router.events])

  return (
    <div
      className="route-progress-track pointer-events-none fixed left-0 right-0 top-0 z-[100000] h-1 overflow-hidden bg-transparent"
      aria-hidden="true"
    >
      <div
        className={`route-progress-bar h-full bg-yellow-600 dark:bg-yellow-500 ${phase}`}
      />
    </div>
  )
}
