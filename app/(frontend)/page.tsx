import { BentoBox, BentoBoxItem } from '@/components/BentoBox'
import { FancyTitle } from '@/components/fancy-title'
import { HeroSection } from '@/components/hero-section'
import { BestSellersSection } from '@/components/products/best-sellers-section'
import { HotDealsSection } from '@/components/products/hot-deals-section'
import { ProductGrid } from '@/components/products/product-grid'
import { SectionDecor } from '@/components/ui/section-decor'
import { client } from '@/lib/client'
import { getBestSellerProducts, getFeaturedProduct } from '@/lib/product-helpers'
import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import { cache, use } from 'react'

const baseUrl = process.env.SITE_BASE_URL || 'https://shop.pilab.hu'

// Use Next.js 16 unstable_cache for better caching control and ISR
const getHomePageData = unstable_cache(
  cache(async () => {
    try {
      const [products, bestSellerProducts, featuredProduct] = await Promise.all([
        client.getProducts({ page: 1, limit: 8 }),
        getBestSellerProducts(undefined, 8),
        getFeaturedProduct(),
      ])

      return {
        products,
        bestSellerProducts,
        featuredProduct,
      }
    } catch (error) {
      console.error('Failed to fetch home page data:', error)
      return {
        products: [],
        bestSellerProducts: [],
        featuredProduct: null,
      }
    }
  }),
  ['home-page-data'],
  {
    revalidate: 3600, // Revalidate every hour
    tags: ['products', 'featured-products', 'best-sellers'],
  },
)

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ShopPi - 2nd hand tech marketplace | Buy and sell second hand tech products',
    description:
      'ShopPi is a 2nd hand tech marketplace where you can buy and sell second hand tech stuffs. Find great deals on laptops, smartphones, headphones and more.',
    alternates: {
      canonical: baseUrl,
    },
    openGraph: {
      title: 'ShopPi - 2nd Hand Tech Marketplace',
      description:
        'Buy and sell second hand tech products. Find great deals on laptops, smartphones, headphones and more.',
      url: baseUrl,
      siteName: 'ShopPi',
      type: 'website',
      images: [
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
      title: 'ShopPi - 2nd Hand Tech Marketplace',
      description:
        'Buy and sell second hand tech products. Find great deals on laptops, smartphones, headphones and more.',
      images: [`${baseUrl}/og-image.jpg`],
    },
  }
}

export default function Home() {
  // Use React 19's use hook to unwrap the promise from unstable_cache
  const { products, bestSellerProducts, featuredProduct } = use(getHomePageData())

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
      <HeroSection />
      <BentoBox className="max-w-[1280px] mx-auto">
        <BentoBoxItem className="col-span-1 md:col-span-2 row-span-1 md:row-span-2">
          <h2 className="text-2xl font-bold">Featured Product</h2>
        </BentoBoxItem>
        <BentoBoxItem>
          <h2 className="text-xl font-bold">New Arrivals</h2>
        </BentoBoxItem>
        <BentoBoxItem>
          <h2 className="text-xl font-bold">On Sale</h2>
        </BentoBoxItem>
      </BentoBox>

      {/* <TopSalesSection /> */}

      <div className="bg-gray-100 pt-14 pb-5">
        <section className="max-w-[1280px] mx-auto px-5 pt-5">
          <h2 className="flex items-center uppercase text-4xl font-bold">
            <SectionDecor />
            <FancyTitle label="Popular Product" />
          </h2>
        </section>

        <main>
          <div className="mx-auto max-w-7xl pt-5 px-2 md:px-6 flex-grow">
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
              <ProductGrid products={products ?? []} />
            </section>
          </div>

          <HotDealsSection products={products ?? []} />

          <BestSellersSection
            title="Best Sellers"
            categories={['Top20', 'Headphones', 'Laptop & PC', 'Smartphone', 'Watch']}
            featuredProduct={featuredProduct || undefined}
            products={bestSellerProducts}
          />
        </main>
      </div>
    </>
  )
}
