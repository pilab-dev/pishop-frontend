import React from 'react'
import type { ProductSliderProps } from '@/payload-types'
import { client } from '@/lib/client'
import { FancyTitle } from '@/components/fancy-title'
import { SectionDecor } from '@/components/ui/section-decor'
import { ProductSliderClient } from './ProductSliderClient'

export const ProductSliderBlock: React.FC<ProductSliderProps> = async (props) => {
  const { title, subtitle, products, columns, showPrice } = props

  const productIds = (products || [])
    .map((p) => p.productId)
    .filter((id): id is string => Boolean(id))

  if (productIds.length === 0) return null

  const fetchedProducts = await client.getProductsByIds(productIds)

  return (
    <section className="relative overflow-hidden bg-dana-light-gray py-14">
      <div className="mx-auto max-w-[1280px] px-5">
        <h2 className="mb-2 flex items-center text-3xl font-bold uppercase font-heading">
          <SectionDecor />
          <FancyTitle label={title || 'Featured Products'} />
        </h2>
        {subtitle && (
          <p className="mb-8 text-sm text-gray-500">{subtitle}</p>
        )}

        <ProductSliderClient
          products={fetchedProducts}
          columns={columns || '4'}
          showPrice={showPrice !== false}
        />
      </div>
    </section>
  )
}
