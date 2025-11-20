import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { RenderHero } from '@/heros/RenderHero'
import type { Page } from '@/payload-types'
import config from '@payload-config'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { cache } from 'react'

const baseUrl = process.env.SITE_BASE_URL || 'https://shop.pilab.hu'

const payload = await getPayload({ config })

/**
 * Get the home page from PayloadCMS.
 * @returns The home page or null if not found.
 */
const getHomePage = cache(async (): Promise<Page> => {
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })

  if (!page.docs?.[0]) {
    throw new Error('Home page not found in PayloadCMS')
  }

  return page.docs[0]
})

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage()

  return {
    title:
      page.meta?.title ||
      'ShopPi - 2nd hand tech marketplace | Buy and sell second hand tech products',
    description:
      page.meta?.description ||
      'ShopPi is a 2nd hand tech marketplace where you can buy and sell second hand tech stuffs. Find great deals on laptops, smartphones, headphones and more.',
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: page.meta?.title || 'ShopPi - 2nd Hand Tech Marketplace',
      description:
        page.meta?.description ||
        'Buy and sell second hand tech products. Find great deals on laptops, smartphones, headphones and more.',
      url: baseUrl,
      siteName: 'ShopPi',
      type: 'website',
      images: page.meta?.image
        ? [
            {
              url: `${baseUrl}/api/media/file/${page.meta.image}`,
              width: 1200,
              height: 630,
              alt: page.meta?.title || 'ShopPi - 2nd Hand Tech Marketplace',
            },
          ]
        : [
            {
              url: `${baseUrl}/og-image.jpg`,
              width: 1200,
              height: 630,
              alt: 'ShopPi - 2nd Hand Tech Marketplace',
            },
          ],
    },
    twitter: {
      card: 'summary_large_image',
      title: page.meta?.title || 'ShopPi - 2nd Hand Tech Marketplace',
      description:
        page.meta?.description ||
        'Buy and sell second hand tech products. Find great deals on laptops, smartphones, headphones and more.',
      images: page.meta?.image
        ? [`${baseUrl}/api/media/file/${page.meta.image}`]
        : [`${baseUrl}/og-image.jpg`],
    },
  }
}

export default async function Home() {
  const page = await getHomePage()

  if (!page) {
    return notFound()
  }

  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'ShopPi',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description:
      'ShopPi is a 2nd hand tech marketplace where you can buy and sell second hand tech products.',
    sameAs: [
      // Add social media URLs if available
    ],
  }

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'ShopPi',
    url: baseUrl,
    description: '2nd hand tech marketplace for buying and selling second hand tech products',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
        type="application/ld+json"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteJsonLd),
        }}
        type="application/ld+json"
      />
      <LivePreviewListener />
      <RenderHero {...page.hero} />
      <RenderBlocks blocks={page.elements} />
    </>
  )
}
