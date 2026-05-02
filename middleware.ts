import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  if (pathname !== '/blog' && pathname !== '/blog/') {
    return NextResponse.next()
  }

  const category = searchParams.get('category')
  if (!category || !category.trim()) {
    return NextResponse.next()
  }

  const url = request.nextUrl.clone()
  url.pathname = `/blog/category/${encodeURIComponent(category.trim())}`
  url.searchParams.delete('category')

  return NextResponse.redirect(url, 308)
}

export const config = {
  matcher: ['/blog', '/blog/'],
}
