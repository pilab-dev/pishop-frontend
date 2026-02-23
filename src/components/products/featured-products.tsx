import { Product, client } from '@/lib/client'
import React from 'react'
import DefaultProductTile from "@/components/products/default-product-tile";

/**
 * Check if the product is a valid product (type guard)
 * @param product the product to check
 */
export function isProduct(product: any): product is Product {
  return product?.id !== undefined
  && typeof product.name === 'string'
  && typeof product.slug === 'string'
  && typeof product.description === 'string'
  && typeof product.images === 'object'
}

type FeaturedProductsProps = {
  products: string[] // Product slug array
  blockType?: string
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = async ({
  products: productTiles,
}) => {
  const promises = productTiles.map((productSlug) => client.getProduct(productSlug))
  const products = await Promise.all(promises)
  console.log('Fetching product data for: ', productTiles)

  return (
    <div className="pt-14 pb-16">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {products.map((product, i) => (
            <DefaultProductTile key={i} product={product!} />
          ))}
        </div>
      </div>
    </div>
  )
}
