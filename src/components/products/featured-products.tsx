import { Product, client } from '@/lib/client'
import React from 'react'

function isProduct(product: string | Product | null | undefined): product is Product {
  return (product as Product)?.id !== undefined && typeof (product as Product).name === 'string'
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
      <div className="max-w-[1280px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10">
          {products.map((product, i) => (
            <DefaultProductTile key={i} product={product!} />
          ))}
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
  if (!product) {
    return null
  }

  // console.log('DefaultProductTile product', isImage(product.images?.[0]))

  // const productImage: MediaResource | undefined = isImage(product.images?.[0])
  //   ? product.images?.[0]
  //   : undefined

  const productImage = product.images[0].url || '#'

  return (
    <div className="transition-all flex flex-row shadow-sm hover:shadow-2xl hover:bg-gray-100">
      <div className="shrink-0" style={{ height: 150 }}>
        <img
          src={productImage}
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
