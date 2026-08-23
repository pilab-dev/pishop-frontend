import React from 'react'
import type { PopularProductProps } from '@/payload-types'
import { client } from '@/lib/client'
import { FancyTitle } from '@/components/fancy-title'
import { SectionDecor } from '@/components/ui/section-decor'
import { PopularProductClient, type PopularProductCategory } from './PopularProductClient'

export const PopularProductBlock: React.FC<PopularProductProps> = async (props) => {
  const { title, categories } = props
  if (!categories || categories.length === 0) return null

  const allIds = categories.flatMap((c) => (c.products || []).map((p) => p.productId).filter(Boolean)) as string[]
  if (allIds.length === 0) return null

  const products = await client.getProductsByIds(allIds)
  const byId = new Map(products.map((p) => [p.id, p]))

  const resolvedCategories: PopularProductCategory[] = categories
    .map((category) => ({
      label: category.label,
      icon: category.icon,
      products: (category.products || [])
        .map((p) => (p.productId ? byId.get(p.productId) : undefined))
        .filter((p): p is NonNullable<typeof p> => Boolean(p)),
    }))
    .filter((c) => c.products.length > 0)

  if (resolvedCategories.length === 0) return null

  return (
    <section className="bg-gray-50 py-14">
      <div className="mx-auto max-w-[1280px] px-5">
        <h2 className="mb-8 flex items-center text-3xl font-bold uppercase">
          <SectionDecor />
          <FancyTitle label={title || 'Popular Product'} />
        </h2>

        <PopularProductClient categories={resolvedCategories} />
      </div>
    </section>
  )
}
