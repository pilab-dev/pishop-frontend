import { Product } from '@/lib/client'
import { hasProductImage } from '@/services/product-service'

const DefaultProductTile: React.FC<{ product: Product }> = ({ product }) => {
  if (!product || !hasProductImage(product)) {
    return null
  }

  const productImage = product.images?.[0]?.url || '#'

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
