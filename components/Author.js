import Link from 'next/link'
import { Avatar } from '@heroui/avatar'

const Author = ({ photoUrl, name }) => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Avatar src={photoUrl} alt={name} size="md" className="shrink-0" />
      <span className="text-sm font-medium">{name}</span>
    </Link>
  )
}

export default Author
