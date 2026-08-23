import { Product } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'
import Image from 'next/image'
import Link from 'next/link'
import { FaStar, FaRegStar } from 'react-icons/fa'
import { FancyTitle } from '../fancy-title'

type MiniProductListProps = {
  featureProducts: Product[]
  topReviewProducts: Product[]
  popularProducts: Product[]
}

const StarRating = ({ rating = 4 }: { rating?: number }) => {
  return (
    <div className="flex text-yellow-400 text-xs my-1">
      {[...Array(5)].map((_, i) => (
        <span key={i}>{i < rating ? <FaStar /> : <FaRegStar />}</span>
      ))}
    </div>
  )
}

const MiniProductCard = ({ product }: { product: Product }) => {
  return (
    <Link href={`/product/${product.slug}`} className="flex flex-row gap-4 group">
      <div className="w-24 h-24 bg-white border border-gray-100 p-2 flex items-center justify-center group-hover:border-primary transition-colors">
        {product.images && product.images[0] ? (
          <Image
            src={product.images[0].url}
            alt={product.images[0].altText || product.name}
            width={80}
            height={80}
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <div className="w-full h-full bg-gray-50 flex items-center justify-center text-xs text-gray-400">
            No image
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center flex-1">
        <h4 className="text-sm font-medium text-gray-800 group-hover:text-primary transition-colors line-clamp-2">
          {product.name}
        </h4>
        <StarRating rating={4} />
        <div className="text-sm">
          <span className="text-gray-500 uppercase text-xs">Price: </span>
          <span className="text-yellow-500 font-semibold">
            {formatCurrency(product.basePrice?.amount ?? 0).trimEnd()}
          </span>
        </div>
      </div>
    </Link>
  )
}

const ProductColumn = ({ title, products }: { title: string; products: Product[] }) => {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="flex items-center uppercase text-xl font-bold mb-2">
        <div className="w-8 h-0.5 bg-yellow-400 mr-3"></div>
        {title}
      </h3>
      <div className="flex flex-col gap-6">
        {products.map((product) => (
          <MiniProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export const MiniProductList: React.FC<MiniProductListProps> = ({
  featureProducts,
  topReviewProducts,
  popularProducts,
}) => {
  return (
    <div className="w-full bg-white py-16">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          <ProductColumn title="Feature Product" products={featureProducts} />
          <ProductColumn title="Top Review" products={topReviewProducts} />
          <ProductColumn title="Popular" products={popularProducts} />
        </div>
      </div>
    </div>
  )
}
