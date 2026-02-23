import React from 'react'

import { FeaturedProducts } from '@/components/products/featured-products'
import { FeaturedProductsProps } from '@/payload-types'

type Props = FeaturedProductsProps & {}

export const FeaturedProductsBlock: React.FC<Props> = (props) => {
  const { products, source } = props

  if (!products || products.length === 0) {
    return null
  }

  // TODO: check for manual slugs

  return <FeaturedProducts products={products.map((p) => p.productSlug)} />
}
