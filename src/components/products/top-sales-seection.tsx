import { Product } from '@/lib/client'
import React from 'react'

function isProduct(product: string | Product | null | undefined): product is Product {
  return (product as Product)?.id !== undefined && typeof (product as Product).name === 'string'
}

type ProductTile = {
  product?: string | Product | null | undefined
  tileType?: 'default' | null
  id?: string | null
}

type FeaturedProductsProps = {
  products: ProductTile[]
  blockType?: string
}

export const TopSalesSection: React.FC<FeaturedProductsProps> = async ({
  products: productTiles,
}) => {
  // Get products from payload
  const products: Product[] = productTiles
    .filter((tile) => tile.product && isProduct(tile.product))
    .map((tile) => tile.product as Product)

  console.log('TopSalesSection products', products)

  return (
    <div className="pt-14 pb-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {products.map((product, i) => {
            switch (productTiles[i].tileType) {
              case 'default':
                return <ProductTile key={i} product={product} />
              default:
                return (
                  <div
                    key={i}
                    className="border-1 border-gray-200 bg-gray-200 p-4 transition-all ease-in-out hover:scale-105 origin-bottom hover:z-50 hover:shadow-lg"
                  >
                    <h3 className="text-3xl font-bold mb-1">{product.name}</h3>
                    <p className="text-gray-600">{product.description}</p>
                  </div>
                )
            }
          })}
        </div>
      </div>
    </div>
  )
}

type MediaResource = {
  alt: string
  url: {
    alt: string
    url: string
    width: number
    height: number
    thumbnailURL: string
  }
}

const isImage = (resource: any): resource is MediaResource => {
  return (
    typeof resource.alt === 'string' &&
    typeof resource.url === 'object' &&
    typeof resource.url.url === 'string' &&
    typeof resource.url.width === 'number' &&
    typeof resource.url.height === 'number' &&
    typeof resource.url.thumbnailURL === 'string'
  )
}

const ProductTile: React.FC<{ product: Product }> = ({ product }) => {
  console.log('ProductTile product', isImage(product.images?.[0]))

  const productImage: MediaResource | undefined = isImage(product.images?.[0])
    ? product.images?.[0]
    : undefined

  return (
    <div
      role="button"
      className="
              border-1 border-gray-200 bg-gray-200 transition-all ease-in-out 
              hover:scale-105 origin-bottom hover:z-50 hover:shadow-lg"
    >
      {/* Here comes the background image which is absolute to the box, and aligns top-left without overflowing (cover the box) */}
      <div className="relative pb-4 h-50 overflow-clip">
        <img
          className="w-full absolute left-0 bottom-0 object-cover h-full"
          src={productImage?.url.url}
          alt={productImage?.alt}
        />
        <div className="absolute p-5 inset-0 text-right flex flex-col justify-end">
          <h3 className="text-3xl font-bold mb-1">{product.name}</h3>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  )
}
