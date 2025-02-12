import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from '@heroui/react'
import { IconAlertTriangle } from '@tabler/icons'

export default function NotFound() {
  const router = useRouter()

  return (
    <div className="mx-auto w-full px-4 pb-4 pt-[72px] sm:min-h-screen sm:px-6 sm:pb-6 sm:pt-[104px] lg:pt-0 2xl:max-w-[1536px]">
      <Head>
        <title>Page Not Found | Gavin Grant Consulting</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <div className="flex items-start justify-center lg:h-screen lg:items-center">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <IconAlertTriangle className="size-7" />
            <p>Sorry, that page can't be found.</p>
          </div>
          <Button
            onPress={() => router.push('/')}
            className="w-full sm:w-auto"
            color="primary"
            radius="sm"
            size="lg"
          >
            Go back home
          </Button>
        </div>
      </div>
    </div>
  )
}
