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

  return (
    <div className="pt-14 pb-16">
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {products.map((product, i) => {
            switch (productTiles[i].tileType) {
              case 'default':
                return <DefaultProductTile key={i} product={product} />
              default:
                return (
                  <div
                    key={i}
                    className="border border-gray-200 bg-gray-200 p-4 transition-all ease-in-out hover:scale-105 origin-bottom hover:z-50 hover:shadow-lg"
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

const DefaultProductTile: React.FC<{ product: Product }> = ({ product }) => {
  console.log('DefaultProductTile product', isImage(product.images?.[0]))

  const productImage: MediaResource | undefined = isImage(product.images?.[0])
    ? product.images?.[0]
    : undefined

  return (
    <div className="transition-all flex flex-row shadow-sm hover:shadow-2xl hover:bg-gray-100">
      <div className="shrink-0" style={{ height: 150 }}>
        <img
          src="https://stacweudevotpeco01apps.blob.core.windows.net/images/30343ea9-a999-4a83-a141-ecc0ec3b2d2d.jpg"
          height={120}
          style={{
            maxHeight: 150,
          }}
          alt="lol"
          title="lol"
        />
      </div>
      <div className="flex-grow p-4">
        <h3 className="text-3xl font-bold mb-1">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
      </div>
    </div>
  )
}
