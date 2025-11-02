'use client'

import Price from '@/components/price'
import { Product } from '@/lib/client'
import { FC } from 'react'

type VariantPriceProps = {
  product: Product
}

export const VariantPrice: FC<VariantPriceProps> = ({ product }) => {
  return (
    <div className="flex flex-col gap-2">
      <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
        <Price
          amount={product.basePrice.amount}
          currencyCode={product.basePrice.currencyCode}
          className="text-2xl font-bold"
        />
        <meta itemProp="priceCurrency" content={product.basePrice.currencyCode} />
        <meta itemProp="price" content={product.basePrice.amount.toString()} />
        {product.inventory && (
          <meta
            itemProp="availability"
            content={
              (product.inventory.quantity && product.inventory.quantity > 0) || product.inventory.allowBackorder
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock"
            }
          />
        )}
      </div>
      {product.compareAtPrice && (
        <Price
          amount={product.compareAtPrice.amount}
          currencyCode={product.compareAtPrice.currencyCode}
          className="text-lg text-gray-500 line-through"
        />
      )}
    </div>
  )
}
