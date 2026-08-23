'use client'

import { Product } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

type ProductTile = {
  product?: Product
  tileType?: 'default' | 'featured'
  badge?: string
  overrideTitle?: string
  overrideDescription?: string
}

type TopSalesSectionProps = {
  products: ProductTile[]
  title?: string
  subtitle?: string
  layout?: 'grid' | 'carousel' | 'list' | 'hero'
  columns?: '1' | '2' | '3' | '4' | '6'
  showPrice?: boolean
  showBadges?: boolean
  callToAction?: {
    text?: string
    link?: string
    style?: 'primary' | 'secondary' | 'outline' | 'link'
  }
}

const ProductTileCard: React.FC<{
  tile: ProductTile
  showPrice: boolean
  showBadges: boolean
}> = ({ tile, showPrice, showBadges }) => {
  const product = tile.product
  if (!product) return null

  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={`
        group relative flex flex-col
        border border-gray-200 bg-white
        transition-all duration-300 ease-in-out
        hover:shadow-lg hover:z-10
        ${tile.tileType === 'featured' ? 'ring-2 ring-primary' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showBadges && tile.badge && (
        <span className="absolute left-2 top-2 z-10 rounded bg-primary px-2 py-1 text-xs font-bold text-white">
          {tile.badge}
        </span>
      )}

      <Link href={`/product/${product.slug}`} className="block flex-1 p-4">
        <div className="relative mb-3 aspect-square overflow-hidden rounded-md bg-gray-100">
          {product.images?.[0] ? (
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText || product.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              No Image
            </div>
          )}
        </div>

        <h3 className="mb-1 line-clamp-2 text-sm font-semibold text-gray-900 md:text-base">
          {tile.overrideTitle || product.name}
        </h3>

        {tile.overrideDescription && (
          <p className="mb-2 text-xs text-gray-600">{tile.overrideDescription}</p>
        )}

        {showPrice && (
          <div className="mt-auto">
            {product.compareAtPrice?.amount &&
              product.compareAtPrice.amount > (product.basePrice?.amount || 0) && (
                <span className="text-xs text-gray-500 line-through">
                  {formatCurrency(product.compareAtPrice.amount).trimEnd()}
                </span>
              )}
            <span className="text-lg font-bold text-primary">
              {formatCurrency(product.basePrice?.amount ?? 0).trimEnd()}
            </span>
          </div>
        )}
      </Link>
    </div>
  )
}

export const TopSalesSection: React.FC<TopSalesSectionProps> = ({
  products,
  title,
  subtitle,
  layout = 'grid',
  columns = '3',
  showPrice = true,
  showBadges = true,
  callToAction,
}) => {
  if (!products || products.length === 0) {
    return null
  }

  const gridCols = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-1 sm:grid-cols-2',
    '3': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    '4': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    '6': 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
  }[columns]

  if (layout === 'list') {
    return (
      <div className="py-14">
        <div className="mx-auto max-w-[1280px] px-5">
          {(title || subtitle) && (
            <div className="mb-8">
              {title && <h2 className="text-3xl font-bold">{title}</h2>}
              {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
            </div>
          )}

          <div className="flex flex-col gap-4">
            {products.map((tile, i) => (
              <ProductTileCard key={i} tile={tile} showPrice={showPrice} showBadges={showBadges} />
            ))}
          </div>

          {callToAction?.text && callToAction?.link && (
            <div className="mt-8 text-center">
              <Link
                href={callToAction.link}
                className={`
                  inline-block rounded px-6 py-3 font-semibold
                  ${
                    callToAction.style === 'outline'
                      ? 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }
                `}
              >
                {callToAction.text}
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  if (layout === 'carousel') {
    return (
      <div className="py-14">
        <div className="mx-auto max-w-[1280px] px-5">
          {(title || subtitle) && (
            <div className="mb-8">
              {title && <h2 className="text-3xl font-bold">{title}</h2>}
              {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
            </div>
          )}

          <div className="scrollbar-hide -mx-5 flex snap-x snap-mandatory overflow-x-auto gap-6 px-5">
            {products.map((tile, i) => (
              <div key={i} className="w-[280px] flex-shrink-0 snap-start">
                <ProductTileCard tile={tile} showPrice={showPrice} showBadges={showBadges} />
              </div>
            ))}
          </div>

          {callToAction?.text && callToAction?.link && (
            <div className="mt-8 text-center">
              <Link
                href={callToAction.link}
                className={`
                  inline-block rounded px-6 py-3 font-semibold
                  ${
                    callToAction.style === 'outline'
                      ? 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                      : 'bg-neutral-900 text-white hover:bg-neutral-800'
                  }
                `}
              >
                {callToAction.text}
              </Link>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="py-14">
      <div className="mx-auto max-w-[1280px] px-5">
        {(title || subtitle) && (
          <div className="mb-8">
            {title && <h2 className="text-3xl font-bold">{title}</h2>}
            {subtitle && <p className="mt-2 text-gray-600">{subtitle}</p>}
          </div>
        )}

        <div className={`grid gap-6 ${gridCols}`}>
          {products.map((tile, i) => (
            <ProductTileCard key={i} tile={tile} showPrice={showPrice} showBadges={showBadges} />
          ))}
        </div>

        {callToAction?.text && callToAction?.link && (
          <div className="mt-8 text-center">
            <Link
              href={callToAction.link}
              className={`
                inline-block rounded px-6 py-3 font-semibold
                ${
                  callToAction.style === 'outline'
                    ? 'border-2 border-primary text-primary hover:bg-primary hover:text-white'
                    : callToAction.style === 'secondary'
                      ? 'bg-gray-900 text-white hover:bg-gray-700'
                      : 'bg-primary text-white hover:bg-primary/90'
                }
              `}
            >
              {callToAction.text}
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
