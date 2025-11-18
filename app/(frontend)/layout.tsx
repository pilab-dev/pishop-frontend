import '@/globals.css'
import { Inter, Lato } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

const lato = Lato({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-lato',
})

import { ConditionalToaster } from '@/components/ConditionalToaster'
import { CartProvider } from '@/components/cart/CartProvider' // New import
import { AppErrorBoundary, SectionErrorBoundary } from '@/components/error-boundary'
import { HeaderSection } from '@/components/header-section'
import { PageFooter } from '@/components/page-footer'
import { GoogleAnalytics } from '@next/third-parties/google'
import clsx from 'clsx'
import { Metadata, Viewport } from 'next'
import { Providers } from './providers'

const gaId = process.env.NEXT_PUBLIC_GA_ID

export const metadata: Metadata = {
  title: {
    default: 'ShopPi - 2nd hand tech marketplace | Buy and sell second hand tech products',
    template: '%s | ShopPi - 2nd hand tech marketplace',
  },
  description:
    'ShopPi is a 2nd hand tech marketplace where you can buy and sell second hand tech stuffs.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'icon',
      url: '/favicon.ico',
    },
  },
  category: 'technology',
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en" className={`${inter.variable} ${lato.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={clsx('bg-background font-sans antialiased')}>
        <AppErrorBoundary>
          <Providers themeProps={{ forcedTheme: 'light' }}>
            <CartProvider>
              {/* New CartProvider wrapper */}
              <div className="relative flex flex-col min-h-screen">
                <SectionErrorBoundary>
                  <HeaderSection />
                </SectionErrorBoundary>
                {/* <SectionErrorBoundary>
                  <MegaMenuSection />
                </SectionErrorBoundary> */}
                <main>
                  <SectionErrorBoundary>{children}</SectionErrorBoundary>
                </main>
                <SectionErrorBoundary>
                  <PageFooter />
                </SectionErrorBoundary>
              </div>
              <ConditionalToaster />
            </CartProvider>
          </Providers>
        </AppErrorBoundary>
        <GoogleAnalytics gaId={gaId as string} />
      </body>
    </html>
  )
}
