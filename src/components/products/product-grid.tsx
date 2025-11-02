'use client'

import { Product } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'
import { useState } from 'react'
import { ImageMedia } from '../Media/ImageMedia'
import ProductButtons from './product-buttons'

export type GridVariant = 'primary' | 'secondary' | 'tertiary'

export type ProductTileProps = {
  product: Product
}

const ProductTile: React.FC<ProductTileProps> = ({ product }) => {
  const [hover, setHover] = useState(false)

  const handleMouseEnter = () => {
    setHover(true)
  }

  const handleMouseLeave = () => {
    setHover(false)
  }

  return (
    <div
      onMouseMove={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={product.id}
      className={`
        relative
        border-gray-200  bg-white 
        p-6 hover:z-20 
        transition-all ease-in-out 
        origin-top scaled-product-tile
        `}
    >
      <h3
        className="products-font text-gray-600 text-xl font-bold mb-1 
      md:text-medium"
      >
        {product.name}
      </h3>
      <p className="products-font text-md uppercase text-gray-600 mb-6 md:text-md">
        Price:
        <span className="text-primary-600 font-semibold ml-1">
          {formatCurrency(product.basePrice?.amount ?? 0).trimEnd()}
          ,00
        </span>{' '}
        <span className="text-gray-400 italic">HUF</span>
      </p>

      {product.images && product.images[0] && (
        <ImageMedia
          alt={product.images[0].altText || product.name}
          resource={product.images[0]}
          className="w-full h-80 object-cover my-3 rounded-md md:h-80 lg:h-[250px]"
        />
      )}
      <p
        className="products-font text-sm text-gray-600"
        dangerouslySetInnerHTML={{
          __html: product.description ?? '',
        }}
      />

      <div className="absolute bottom-0 left-0 right-0">
        <div className="flex flex-row justify-center">
          <ProductButtons product={product} show={hover} handle={product.slug} />
        </div>
      </div>
    </div>
  )
}

type ProductGridProps = {
  products: Product[]
  variant?: GridVariant
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products }) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
      style={{
        gap: '2px',
      }}
    >
      {products.map((product, index) => (
        <ProductTile key={index} product={product} />
      ))}
    </div>
  )
}
