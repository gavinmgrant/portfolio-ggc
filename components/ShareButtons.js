import { Button } from '@heroui/react'
import {
  IconBrandLinkedin,
  IconBrandThreads,
  IconBrandBluesky,
} from '@tabler/icons-react'

const ShareButtons = ({ postTitle, postUrl }) => {
  const ShareButton = ({ icon, url }) => {
    return (
      <Button
        isIconOnly
        variant="bordered"
        className="rounded-full transition-all duration-300 ease-in-out hover:scale-105 active:scale-75"
        onPress={() => window.open(url, '_blank', 'noopener,noreferrer')}
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
        url={`https://www.linkedin.com/sharing/share-offsite/?url=${postUrl}`}
      />
      <ShareButton
        icon={<IconBrandThreads size={24} />}
        url={`https://www.threads.net/intent/post?text=${encodedTitleAndUrl}`}
      />
      <ShareButton
        icon={<IconBrandBluesky size={24} />}
        url={`https://bsky.app/intent/compose?text=${postUrl}`}
      />
    </div>
  )
}

export default ShareButtons
