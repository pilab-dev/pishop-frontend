import {Product} from "@/lib/client";

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

/**
 * Check if the resource is an image (type guard)
 * @param resource
 */
export const isImage = (resource: any): resource is MediaResource => {
  return (
    typeof resource.alt === 'string' &&
    typeof resource.url === 'object' &&
    typeof resource.url.url === 'string' &&
    typeof resource.url.width === 'number' &&
    typeof resource.url.height === 'number' &&
    typeof resource.url.thumbnailURL === 'string'
  )
}

/**
 * Check if the product has an image
 * @param product
 */
const hasImage = (product: Product): boolean => {
  return product.images?.length > 0
}

const DefaultProductTile: React.FC<{ product: Product }> = ({ product }) => {
  if (!product || !hasImage(product)) {
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
      <div className="grow p-4">
        <h3 className="text-3xl font-bold mb-1">{product.name}</h3>
        <p className="text-gray-600">{product.description}</p>
      </div>
    </div>
  )
}

export default DefaultProductTile
