import type { PortableTextBlock } from 'next-sanity'

export type BlogPostImageBlock = {
  _type: 'image'
  _key: string
  asset?: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
  source?: string
  loading?: 'lazy' | 'eager'
}

export type BlogPostTableRow = {
  _key?: string
  cells?: string[]
}

export type BlogPostTableBlock = {
  _type: 'table'
  _key: string
  caption?: string
  rows?: BlogPostTableRow[]
}

export type BlogPostCodeBlock = {
  _type: 'code'
  _key: string
  code?: string
  language?: string
}

export type BlogPostBodyBlock =
  | PortableTextBlock
  | BlogPostImageBlock
  | BlogPostTableBlock
  | BlogPostCodeBlock
