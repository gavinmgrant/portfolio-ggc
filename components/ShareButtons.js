import { Button } from '@heroui/react'
import {
  IconBrandLinkedin,
  IconBrandThreads,
  IconBrandBluesky,
} from '@tabler/icons-react'

const ShareButtons = ({ postTitle, postUrl }) => {
  const getMobileUrl = (platform, urls) => {
    if (platform === 'iOS') return urls.ios
    if (platform === 'Android') return urls.android
    return urls.web // fallback to web url
  }

  const getPlatform = () => {
    if (/iPhone|iPad|iPod/i.test(navigator.userAgent)) return 'iOS'
    if (/Android/i.test(navigator.userAgent)) return 'Android'
    return 'Desktop'
  }

  const ShareButton = ({ icon, urls }) => {
    const handleClick = () => {
      const platform = getPlatform()
      const url = getMobileUrl(platform, urls)
      window.open(url, '_blank', 'noopener,noreferrer')
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
          ios: `instagram://sharesheet?text=${encodedTitleAndUrl}`,
          android: `instagram://sharesheet?text=${encodedTitleAndUrl}`,
        }}
      />
      <ShareButton
        icon={<IconBrandBluesky size={24} />}
        urls={{
          web: `https://bsky.app/intent/compose?text=${postUrl}`,
          ios: `bsky://composer?text=${postUrl}`,
          android: `atproto://composer?text=${postUrl}`,
        }}
      />
    </div>
  )
}

export default ShareButtons
