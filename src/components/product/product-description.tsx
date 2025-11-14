'use client'

import Price from '@/components/price'
import { ColorSwatchSelector } from '@/components/product/color-swatch-selector'
import { useProduct, useUpdateURL } from '@/components/product/product-context'
import { QuantitySelector } from '@/components/product/quantity-selector'
import { SizeSelector } from '@/components/product/size-selector'
import { StarRating } from '@/components/product/star-rating'
import { VariantSelector } from '@/components/product/variant-selector'
import { Product } from '@/lib/client'
import { useCartStore } from '@/store/cart-store'
import { Heart, ShoppingCart } from 'lucide-react'
import { FC, useState } from 'react'

type ProductDescriptionProps = {
  product: Product
}

export const ProductDescription: FC<ProductDescriptionProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart)
  const [quantity, setQuantity] = useState(1)
  const { state, updateOption } = useProduct()
  const updateURL = useUpdateURL()

  if (!product) return null

  const handleSizeSelect = (value: string) => {
    const newState = updateOption('size', value)
    updateURL(newState)
  }

  const handleColorSelect = (value: string) => {
    const newState = updateOption('color', value)
    updateURL(newState)
  }

  const handleBuyNow = () => {
    addToCart(product, quantity)
  }

  const subtitle = product.category?.name || product.collections?.[0]?.name || ''

  return (
    <div
      className="page-gray-600 my-15 p-8 text-white"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
        <meta itemProp="name" content="Pilab" />
      </div>

      <h1 className="mb-2 text-3xl font-bold uppercase tracking-wide" itemProp="name">
        {product.name}
      </h1>

      {subtitle && <p className="mb-4 text-sm text-white/80">{subtitle}</p>}

      <div className="mb-4">
        <StarRating rating={3.5} className="text-white/50" />
      </div>

      <div className="mb-6 font-medium products-font">
        <Price
          amount={product.basePrice.amount}
          currencyCode={product.basePrice.currencyCode}
          className="text-4xl font-bold text-white"
        />
      </div>

      {product.description && (
        <div className="mb-6 text-sm leading-relaxed text-white/80" itemProp="description">
          <p>
            {product.description.replace(/<[^>]*>/g, '').substring(0, 200)}
            {product.description.length > 200 ? '...' : ''}
          </p>
        </div>
      )}

      {product.options && product.options.length > 0 && (
        <div className="mb-6 space-y-4">
          {product.options.some((opt) => opt.name.toLowerCase() === 'size') && (
            <div>
              <label className="mb-2 block text-sm font-medium uppercase tracking-wide">Size</label>
              <SizeSelector
                optionGroups={product.options}
                variants={product.variants || []}
                selectedValue={state.size}
                onSelect={handleSizeSelect}
              />
            </div>
          )}

          {product.options.some((opt) => opt.name.toLowerCase() === 'color') && (
            <div>
              <label className="mb-2 block text-sm font-medium uppercase tracking-wide">
                Color
              </label>
              <ColorSwatchSelector
                optionGroups={product.options}
                variants={product.variants || []}
                selectedValue={state.color}
                onSelect={handleColorSelect}
              />
            </div>
          )}

          {product.variants && product.variants.length > 1 && (
            <VariantSelector
              options={product.variants.flatMap((v) => v.options)}
              variants={product.variants}
            />
          )}
        </div>
      )}

      <div className="mb-6 flex items-center gap-4">
        <QuantitySelector value={quantity} onChange={setQuantity} />
        <div className="flex gap-2">
          <button
            onClick={handleBuyNow}
            className="flex items-center gap-2 bg-yellow-400 px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-yellow-500"
          >
            <ShoppingCart className="h-5 w-5" />
            Buy now
          </button>
          <button
            onClick={handleBuyNow}
            className="flex items-center gap-2 border border-white/30 bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/10"
          >
            Buy now
          </button>
          <button
            className="flex items-center justify-center border border-white/30 bg-transparent p-3 text-white transition-colors hover:bg-white/10"
            aria-label="Add to wishlist"
          >
            <Heart className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  )
}
