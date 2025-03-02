import { Button } from '@heroui/react'
import {
  IconBrandLinkedin,
  IconBrandThreads,
  IconBrandBluesky,
} from '@tabler/icons-react'

const ShareButtons = ({ postTitle, postUrl }) => {
  const getPlatform = () => {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) return 'iOS'
    if (/Android/i.test(navigator.userAgent)) return 'Android'
    return 'Desktop'
  }

  const getMobileUrl = (platform, urls) => {
    if (platform === 'iOS') return urls.ios
    if (platform === 'Android') return urls.android
    return urls.web // fallback to web url
  }

  const ShareButton = ({ icon, urls }) => {
    const handleClick = () => {
      const platform = getPlatform()
      const url = getMobileUrl(platform, urls)

      const newWindow = window.open(url, '_blank')

      // fallback: if the app doesn’t open, redirect to the web URL after 1 second
      setTimeout(() => {
        if (
          !newWindow ||
          newWindow.closed ||
          typeof newWindow.closed === 'undefined'
        ) {
          window.location.href = urls.web
        }
      }, 1000)
    }

    return (
      <Button
        isIconOnly
        variant="bordered"
        className="rounded-full transition-all duration-300 ease-in-out hover:scale-105 active:scale-75"
        onPress={handleClick}
      >
        {icon}
      </Button>
    )
  }

  const titleAndUrl = `${postTitle}\n${postUrl}`
  const encodedTitleAndUrl = encodeURIComponent(titleAndUrl)

  return (
    <div className="flex items-center gap-2">
      <ShareButton
        icon={<IconBrandLinkedin size={24} />}
        urls={{
          web: `https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`,
          ios: `linkedin://shareArticle?mini=true&url=${postUrl}`,
          android: `linkedin://shareArticle?mini=true&url=${postUrl}`,
        }}
      />
      <ShareButton
        icon={<IconBrandThreads size={24} />}
        urls={{
          web: `https://www.threads.net/intent/post?text=${encodedTitleAndUrl}`,
          ios: `threads://post?text=${encodedTitleAndUrl}`,
          android: `threads://post?text=${encodedTitleAndUrl}`,
        }}
      />
      <ShareButton
        icon={<IconBrandBluesky size={24} />}
        urls={{
          web: `https://bsky.app/intent/compose?text=${postUrl}`,
          ios: `https://bsky.app/intent/compose?text=${postUrl}`,
          android: `https://bsky.app/intent/compose?text=${postUrl}`,
        }}
      />
    </div>
  )
}

export default ShareButtons
