import type { Metadata } from 'next'

import { ProductProvider } from '@/components/product/product-context'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Product as SchemaProduct, WithContext } from 'schema-dts'
import { BaseProduct } from './base-product'

const baseUrl = process.env.SITE_BASE_URL

import { GridTileImage } from '@/components/grid/tile'
import { BreadcrumbBar } from '@/components/products/breadcrumb-bar'
import { Footer } from '@/Footer/Component'
import { client } from '@/lib/client'
import type { Product as GraphQLProduct } from '@/lib/client/types'
import { HIDDEN_PRODUCT_TAG } from '@/lib/constants'

const getProductRecommendations = async (id: string): Promise<GraphQLProduct[]> => {
  try {
    const products = await client.getProducts({ limit: 4 })
    return products.filter((p) => p.id !== id).slice(0, 4)
  } catch (error) {
    console.error('Error fetching product recommendations:', error)
    return []
  }
}

const getProduct = async (slug: string): Promise<GraphQLProduct> => {
  const product = await client.getProduct(slug)
  if (!product) return notFound()

  return product
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params

  const product = await getProduct(params.slug)

  if (!product) return notFound()

  // Check if the product has a tag that indicates it should not be indexed
  const tagFieldContainsHiddenTag = (tags: string[] | undefined) => {
    if (tags && Array.isArray(tags)) {
      return tags.includes(HIDDEN_PRODUCT_TAG)
    }
    return false
  }

  const indexable = !tagFieldContainsHiddenTag(product.tags)
  const featuredImage = product.images?.[0]

  const ogImage = {
    url: featuredImage?.url
      ? `${baseUrl}${featuredImage.url}`
      : `${baseUrl}/product/${product.slug}/opengraph-image`,
    width: featuredImage?.width || 1200,
    height: featuredImage?.height || 630,
    alt: featuredImage?.altText || product.name,
  }

  return {
    title: product.name,
    description: product.description || product.shortDescription || '',
    alternates: {
      canonical: `${baseUrl}/product/${product.slug}`,
    },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: {
      images: [ogImage],
      description: product.description || product.shortDescription || '',
    },
    other: {
      'og:site_name': 'PiShop',
      'og:type': 'product',
      'product:brand': 'Pilab',
      'product:product_link': `${baseUrl}/product/${product.slug}`,
      'product:price': product.basePrice.amount.toString(),
      'product:plural_title': product.name,
    },
  }
}

export default async function ProductPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params

  const product = await getProduct(params.slug)

  if (!product) return notFound()

  const isInStock = product.inventory
    ? (product.inventory.quantity && product.inventory.quantity > 0) ||
      product.inventory.allowBackorder
    : false

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || product.shortDescription,
    image: product.images?.[0]?.url,
    url: `https://shop.pilab.hu/product/${product.slug}`,
    offers: [
      {
        '@type': 'Offer',
        availability: isInStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        priceCurrency: product.basePrice.currencyCode,
        price: product.basePrice.amount.toString(),
        url: `https://shop.pilab.hu/product/${product.slug}`,
        priceValidUntil: '2025-12-31',
      },
    ],
    brand: {
      '@type': 'Brand',
      name: 'Pilab',
    },
    sku: product.sku || product.id,
  } satisfies WithContext<SchemaProduct>

  const breadcrumbSegments: Array<{ name: string; href: string }> = []

  return (
    <ProductProvider>
      <>
        {breadcrumbSegments.length > 0 && <BreadcrumbBar segments={breadcrumbSegments} />}
        <script
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(productJsonLd),
          }}
          type="application/ld+json"
        />
        <div className="mx-auto max-w-screen-2xl px-4">
          <BaseProduct product={product} />

          {product.description && (
            <div className="py-8">
              <h2 className="mb-4 text-2xl font-bold">Specifikáció</h2>
              <div className="prose dark:prose-invert">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <p className="mb-2 font-semibold">Leírás</p>
                    <p>{product.description}</p>
                  </div>
                  {product.inventory && (
                    <div>
                      <p className="mb-2 font-semibold">Raktáron</p>
                      <p>{product.inventory.quantity || 0} db</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <RelatedProducts id={product.id} />
        </div>
        <Footer />
      </>
    </ProductProvider>
  )
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id)

  if (!relatedProducts.length) return null

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.slug}
            className="aspect-square w-full flex-none min-[475px]:w-12 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.slug}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.name}
                label={{
                  title: product.name,
                  amount: product.basePrice.amount.toString(),
                  currencyCode: product.basePrice.currencyCode,
                }}
                src={product.images?.[0]?.url || ''}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
