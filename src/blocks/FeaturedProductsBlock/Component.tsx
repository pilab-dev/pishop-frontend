import React, { cache } from 'react'

import { TopSalesSection } from '@/components/products/top-sales-seection'
import { FeaturedProductsProps } from '@/payload-types'
import { client, Product } from '@/lib/client'
import { unstable_cache } from 'next/cache'

type Props = FeaturedProductsProps & {}

const fetchProductsByIds = unstable_cache(
  cache(async (productIds: string[]) => {
    if (!productIds || productIds.length === 0) return []
    return client.getProductsByIds(productIds)
  }),
  ['featured-products-by-ids'],
  { revalidate: 3600 },
)

const fetchProductsByCollection = unstable_cache(
  cache(async (collectionSlug: string, limit: number = 12) => {
    if (!collectionSlug) return []
    const collection = await client.getCollection(collectionSlug)
    return collection?.products?.slice(0, limit) || []
  }),
  ['featured-products-by-collection'],
  { revalidate: 3600 },
)

export const FeaturedProductsBlock: React.FC<Props> = async (props) => {
  const { products, source, collection, displaySettings, title, subtitle, callToAction } = props

  let fetchedProducts: Product[] = []
  const productIds = products?.map((p) => p.productId).filter(Boolean) || []

  if (source === 'manual' && productIds.length > 0) {
    fetchedProducts = await fetchProductsByIds(productIds)
  } else if (source === 'collection' && collection) {
    fetchedProducts = await fetchProductsByCollection(collection, displaySettings?.maxItems || 12)
  }

  if (fetchedProducts.length === 0 && (!products || products.length === 0)) {
    return null
  }

  const maxItems = displaySettings?.maxItems || fetchedProducts.length
  const displayProducts = fetchedProducts.slice(0, maxItems)

  const productTiles =
    products
      ?.map((tile, index) => {
        const product = displayProducts[index]
        return {
          product,
          tileType: tile.badge ? 'featured' : 'default',
          badge: tile.badge || undefined,
          overrideTitle: tile.overrideTitle || undefined,
          overrideDescription: tile.overrideDescription || undefined,
        }
      })
      .filter((t) => t.product) || displayProducts.map((p) => ({ product: p }))

  const cta = callToAction
    ? {
        text: callToAction.text || undefined,
        link: callToAction.link || undefined,
        style: callToAction.style || 'primary',
      }
    : undefined

  return (
    <TopSalesSection
      products={productTiles}
      title={title || undefined}
      subtitle={subtitle || undefined}
      layout={displaySettings?.layout || 'grid'}
      columns={displaySettings?.columns || '3'}
      showPrice={displaySettings?.showPrice ?? true}
      showBadges={displaySettings?.showBadges ?? true}
      callToAction={cta}
    />
  )
}
