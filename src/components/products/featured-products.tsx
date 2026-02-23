import { Product, client } from '@/lib/client'
import { fetchProductsBySlugs } from '@/services/product-service'
import React from 'react'
import DefaultProductTile from "@/components/products/default-product-tile";

type FeaturedProductsProps = {
  products: string[] // Product slug array
  blockType?: string
}

export const FeaturedProducts: React.FC<FeaturedProductsProps> = async ({
  products: productTiles,
}) => {
  const products = await fetchProductsBySlugs(productTiles)

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
