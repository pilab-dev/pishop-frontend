'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Product } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'

const COLUMN_WIDTHS: Record<string, string> = {
  '3': 'w-[calc(33.333%-10px)]',
  '4': 'w-[calc(25%-12px)]',
  '5': 'w-[calc(20%-12px)]',
}

function SliderProductTile({
  product,
  showPrice,
}: {
  product: Product
  showPrice: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      whileHover={{ y: -4 }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="group flex flex-col bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
      >
        <div className="relative mb-3 aspect-square overflow-hidden bg-gray-50">
          {product.images?.[0] && (
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText || product.name}
              fill
              className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
            />
          )}
        </div>
        <h3 className="line-clamp-2 font-heading text-sm font-semibold text-gray-900">{product.name}</h3>
        {showPrice && (
          <p className="mt-1 font-bold text-primary">
            {formatCurrency(product.basePrice.amount, product.basePrice.currencyCode)}
          </p>
        )}
      </Link>
    </motion.div>
  )
}

export function ProductSliderClient({
  products,
  columns,
  showPrice,
}: {
  products: Product[]
  columns: string
  showPrice: boolean
}) {
  return (
    <div className="-mx-5 flex gap-4 overflow-x-auto px-5 pb-4 snap-x snap-mandatory scrollbar-hide">
      {products.map((product) => (
        <div
          key={product.id}
          className={`${COLUMN_WIDTHS[columns] || COLUMN_WIDTHS['4']} flex-shrink-0 snap-start`}
        >
          <SliderProductTile product={product} showPrice={showPrice} />
        </div>
      ))}
    </div>
  )
}
