import Link from 'next/link'
import type { PortableTextBlock } from 'next-sanity'
import { convertToSlug } from '@/utils/handleSlugs'

interface ProcessedHeading {
  href: string
  text: string
}

function filterHeadings(
  richText?: PortableTextBlock[] | null
): ProcessedHeading[] {
  if (!Array.isArray(richText)) return []

  return richText.reduce<ProcessedHeading[]>((headings, block) => {
    // only process block type with style h2
    if (block._type !== 'block' || !block.style?.startsWith('h2')) {
      return headings
    }
    const text = block.children
      ?.map((child) => child.text)
      .join('')
      .trim()

    if (!text) return headings

    const slug = convertToSlug(text)
    headings.push({ href: `${slug}`, text })
    return headings
  }, [])
}

const TableOfContents = ({ richText }: { richText?: PortableTextBlock[] }) => {
  const headings = filterHeadings(richText as PortableTextBlock[])
  if (!headings.length) return null

  const handleSmoothScroll = (href: string) => {
    const targetElement = document.getElementById(href)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="space-y-3 overflow-y-scroll">
      {headings.map(({ href, text }) => (
        <div key={href} className="hover-color text-sm">
          <button onClick={() => handleSmoothScroll(href)}>{text}</button>
        </div>
      ))}
    </div>
  )
}

export default TableOfContents
