import React from 'react'
import { FeaturedProductProps } from '@/payload-types'
import { FeaturedProductSection } from '@/components/featured-product-section'
import { client } from '@/lib/client'

export const FeaturedProductBlock: React.FC<FeaturedProductProps> = async (props) => {
  const { title, product: productRel } = props

  if (!productRel) return null

  const productId = typeof productRel === 'string' ? productRel : productRel.id
  let fetchedProduct = null
  
  try {
    const products = await client.getProductsByIds([productId])
    fetchedProduct = products[0]
  } catch (error) {
    console.error('Failed to fetch product for FeaturedProductBlock:', error)
  }

  if (!fetchedProduct) return null

  return (
    <FeaturedProductSection 
      title={title || undefined} 
      product={fetchedProduct} 
    />
  )
}
