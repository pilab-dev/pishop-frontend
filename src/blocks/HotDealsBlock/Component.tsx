import React from 'react'

import { HotDealsSection } from '@/components/products/hot-deals-section'
import type { HotDealsBlock as HotDealsBlockComponentProps } from '@/payload-types'

type Props = HotDealsBlockComponentProps & {}

export const HotDealsBlock: React.FC<Props> = ({ products }) => {
  // Since we're not storing products in PayloadCMS, we use the first product identifier as a slug
  const productSlug = products?.[0]?.product || ''

  return (
    <HotDealsSection
      products={[]} // HotDealsSection uses hardcoded data, only needs the slug
      productSlug={productSlug}
    />
  )
}
