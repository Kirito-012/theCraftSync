import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  const host = request.headers.get('host')
  const url = request.nextUrl.clone()

  // If host is thecraftsync.com (non-www), redirect to www.thecraftsync.com
  if (host === 'thecraftsync.com') {
    url.host = 'www.thecraftsync.com'
    return NextResponse.redirect(url, 301)
  }

  return NextResponse.next()
}

// Only run on page routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}
