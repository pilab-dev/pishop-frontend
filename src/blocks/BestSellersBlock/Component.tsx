import React from 'react'

import type { BestSellersProps } from '@/payload-types'
import { client } from '@/lib/client'
import { BestSellersSection } from '@/components/products/best-sellers-section'

export const BestSellersBlock: React.FC<BestSellersProps> = async (props) => {
  const { title, source, products: manualProducts } = props

  // Only the manual-selection source is implemented; auto (top-selling) and
  // promotionalContent sourcing need their own data pipelines and aren't
  // exercised by any content in this project yet.
  if (source !== 'manual' || !manualProducts || manualProducts.length === 0) {
    return null
  }

  const sorted = [...manualProducts].sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0))
  const ids = sorted.map((p) => p.productId)

  let products: Awaited<ReturnType<typeof client.getProductsByIds>> = []
  try {
    products = await client.getProductsByIds(ids)
  } catch (error) {
    console.error('Failed to fetch products for BestSellersBlock:', error)
    return null
  }

  if (products.length === 0) return null

  return <BestSellersSection title={title || undefined} products={products} />
}
