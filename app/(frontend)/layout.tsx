import '@/globals.css'
import '@fontsource/inter'
import '@fontsource/lato'

import { ConditionalToaster } from '@/components/ConditionalToaster'
import { CartProvider } from '@/components/cart/CartProvider' // New import
import { CartUIProvider } from '@/components/cart/cart-context'
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
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx('bg-background font-sans antialiased')}>
        <AppErrorBoundary>
          <Providers themeProps={{ forcedTheme: 'light' }}>
            <CartUIProvider>
              <CartProvider>
                {' '}
                {/* New CartProvider wrapper */}
                <div className="relative flex flex-col min-h-screen">
                  <SectionErrorBoundary>
                    <HeaderSection />
                  </SectionErrorBoundary>
                  <main>
                    <SectionErrorBoundary>{children}</SectionErrorBoundary>
                  </main>
                  <SectionErrorBoundary>
                    <PageFooter />
                  </SectionErrorBoundary>
                </div>
                <ConditionalToaster />
              </CartProvider>
            </CartUIProvider>
          </Providers>
        </AppErrorBoundary>
        <GoogleAnalytics gaId={gaId as string} />
      </body>
    </html>
  )
}
