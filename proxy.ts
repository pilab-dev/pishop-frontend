import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()
  const pathname = request.nextUrl.pathname

  // Next.js 16 enhanced caching and SEO strategy
  const isUserSpecificRoute = pathname.match(
    /(cart|checkout|login|signup|account|order-confirmation)/
  )

  const isAdminRoute = pathname.startsWith('/admin')
  const isApiRoute = pathname.startsWith('/api')
  const isStaticAsset = pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|avif|webp)$/)
  const isSitemap = pathname.includes('sitemap')
  const isRobots = pathname === '/robots.txt'

  // SEO-critical files - optimized caching
  if (isSitemap || isRobots) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800'
    )
    return response
  }

  // Static assets - long-term caching with Next.js 16 optimizations
  if (isStaticAsset) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable'
    )
    // Add preload hints for critical assets
    if (pathname.endsWith('.woff2')) {
      response.headers.set('Link', `<${pathname}>; rel=preload; as=font; crossorigin`)
    }
    return response
  }

  // API routes - no caching for dynamic data, enhanced security
  if (isApiRoute) {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    return response
  }

  // Admin routes - enhanced security with Next.js 16 features
  if (isAdminRoute) {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate, private')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('X-Frame-Options', 'DENY')
    response.headers.set('X-Content-Type-Options', 'nosniff')
    return response
  }

  // User-specific routes (cart, checkout, account) - private, short cache with enhanced privacy
  if (isUserSpecificRoute) {
    response.headers.set('Cache-Control', 'private, max-age=60, must-revalidate')
    response.headers.set('Vary', 'Cookie, Authorization')
    return response
  }

  // Public pages - Next.js 16 optimized caching for SEO and performance
  // Enhanced with better stale-while-revalidate patterns
  response.headers.set(
    'Cache-Control',
    'public, max-age=1800, s-maxage=3600, stale-while-revalidate=86400'
  )

  // Add comprehensive SEO headers for public pages
  if (!pathname.match(/\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|avif|webp)$/)) {
    response.headers.set('X-Robots-Tag', 'index, follow')
    // Add security headers for better SEO trust signals
    response.headers.set('X-Content-Type-Options', 'nosniff')
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  }

  // Add performance hints for better Core Web Vitals
  if (pathname === '/' || pathname.startsWith('/product/')) {
    response.headers.set('Link', '</api/revalidate>; rel=preload; as=fetch; crossorigin')
  }

  return response
}

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
