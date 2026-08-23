import type { Product } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'
import Image from 'next/image'
import Link from 'next/link'

export function FeaturedProductCard({ product }: { product: Product }) {
  const image = product.images?.[0]
  const onSale = product.compareAtPrice && product.compareAtPrice.amount > product.basePrice.amount

  return (
    <Link
      href={`/product/${product.slug}`}
      className="flex items-center gap-3 bg-white p-3 shadow-md hover:shadow-lg transition-shadow"
    >
      {image && (
        <Image
          src={image.url}
          alt={image.altText || product.name}
          width={56}
          height={56}
          className="w-14 h-14 object-contain flex-shrink-0"
        />
      )}
      <div className="min-w-0">
        <p className="text-sm font-semibold text-gray-900 line-clamp-2">{product.name}</p>
        <p className="text-sm mt-1">
          {onSale && <span className="text-gray-400 line-through mr-1">{formatCurrency(product.compareAtPrice!.amount, product.compareAtPrice!.currencyCode)}</span>}
          <span className="text-primary font-bold">
            {formatCurrency(product.basePrice.amount, product.basePrice.currencyCode)}
          </span>
        </p>
      </div>
    </Link>
  )
}
