import React from 'react'

import type { BestProposesProps } from '@/payload-types'
import { client, type Product } from '@/lib/client'
import { FancyTitle } from '@/components/fancy-title'
import { SectionDecor } from '@/components/ui/section-decor'
import { BestProposesClient } from './BestProposesClient'

export const BestProposesBlock: React.FC<BestProposesProps> = async (props) => {
  const { title, tabs, primary, secondary } = props

  const productIds = [primary?.productId, ...(secondary || []).map((s) => s.productId)].filter(
    (id): id is string => Boolean(id),
  )
  if (productIds.length === 0) return null

  const products = await client.getProductsByIds(productIds)
  const byId = new Map(products.map((p) => [p.id, p]))

  const primaryProduct = primary?.productId ? byId.get(primary.productId) : undefined
  const secondaryTiles = (secondary || [])
    .map((s) => ({ product: s.productId ? byId.get(s.productId) : undefined, icon: s.badgeIcon, color: s.badgeColor }))
    .filter((t): t is typeof t & { product: Product } => Boolean(t.product))

  if (!primaryProduct) return null

  return (
    <section className="relative overflow-hidden bg-white py-14">
      <div className="mx-auto max-w-[1280px] px-5">
        <h2 className="mb-8 flex items-center text-3xl font-bold uppercase">
          <SectionDecor />
          <FancyTitle label={title || 'Best Proposes'} />
        </h2>

        <div className="relative">
          <BestProposesClient
            primary={{ product: primaryProduct as Product, icon: primary?.badgeIcon, color: primary?.badgeColor }}
            secondary={secondaryTiles}
            tabs={tabs?.map((t) => t.label)}
          />
        </div>
      </div>
    </section>
  )
}
