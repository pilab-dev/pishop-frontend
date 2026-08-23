import React from 'react'
import { MiniProductListProps } from '@/payload-types'
import { MiniProductList } from '@/components/products/mini-product-list'
import { client } from '@/lib/client'

export const MiniProductListBlock: React.FC<MiniProductListProps> = async (props) => {
  const newArrivalsIds = props.newArrivals?.map((p) => typeof p.product === 'string' ? p.product : p.product.id) || []
  const topRatedIds = props.topRated?.map((p) => typeof p.product === 'string' ? p.product : p.product.id) || []
  const bestSellersIds = props.bestSellers?.map((p) => typeof p.product === 'string' ? p.product : p.product.id) || []

  // Collect all unique IDs to fetch them at once
  const allIds = Array.from(new Set([...newArrivalsIds, ...topRatedIds, ...bestSellersIds]))
  
  if (allIds.length === 0) {
    return null
  }

  const allProducts = await client.getProductsByIds(allIds)

  // Map fetched products back to their respective arrays
  const newArrivals = newArrivalsIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as any
  const topRated = topRatedIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as any
  const bestSellers = bestSellersIds.map(id => allProducts.find(p => p.id === id)).filter(Boolean) as any

  return (
    <MiniProductList 
      featureProducts={newArrivals}
      topReviewProducts={topRated}
      popularProducts={bestSellers}
    />
  )
}
