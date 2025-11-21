import React from 'react'

import type { HeroBlockProps } from '@/payload-types'

import { HeroSection } from '@/components/hero-section'
import { client } from '@/lib/client'

type Props = HeroBlockProps & {}

export const HeroBlock: React.FC<Props> = async (props) => {
  const { product } = props

  if (!product?.productSlug) {
    console.error('No product slug provided for HeroBlock.. Mi a cukros fasz ez?!')

    return null
  }

  // Fetch product to get slug (client.getProduct accepts both ID and slug)
  const productData = await client.getProduct(product.productSlug)

  if (!productData?.slug) {
    console.error('No product data found for product slug: ' + product.productSlug)

    return null
  }

  return <HeroSection productSlug={productData.slug} />
}
