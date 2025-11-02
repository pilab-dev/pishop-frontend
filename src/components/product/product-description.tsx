'use client'

import { VariantPrice } from '@/components/product/variant-price'
import Prose from '@/components/prose'
import { Badge } from '@/components/ui/badge'
import { Product } from '@/lib/client'
import { useCartStore } from '@/store/cart-store'
import { FC } from 'react'

type ProductDescriptionProps = {
  product: Product
}

export const ProductDescription: FC<ProductDescriptionProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart)
  if (!product) return null

  return (
    <>
      <div itemProp="brand" itemScope itemType="https://schema.org/Brand">
        <meta itemProp="name" content="Pilab" />
      </div>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium" itemProp="name">
          {product.name}
        </h1>
        <div className="mr-auto w-auto rounded-full bg-red-700 p-2 text-sm text-white">
          <VariantPrice product={product} />
        </div>
      </div>
      {product.description ? (
        <div itemProp="description">
          <Prose
            className="mb-6 text-sm leading-tight dark:text-white/[60%]"
            html={product.description || ''}
          />
        </div>
      ) : null}

      {/* Product Details */}
      <div className="mb-6 space-y-4">
        <h3 className="text-lg font-semibold">Product Details</h3>
        <div className="grid grid-cols-1 gap-3 text-sm">
          {product.sku && (
            <div className="flex justify-between">
              <span className="font-medium">SKU:</span>
              <span itemProp="sku">{product.sku}</span>
            </div>
          )}
          {product.inventory && (
            <>
              <div className="flex justify-between">
                <span className="font-medium">Stock:</span>
                <span>
                  {product.inventory.trackQuantity
                    ? product.inventory.quantity || 0
                    : 'Not tracked'}
                </span>
              </div>
              {product.inventory.allowBackorder && (
                <div className="flex justify-between">
                  <span className="font-medium">Backorder:</span>
                  <span>Allowed</span>
                </div>
              )}
            </>
          )}
          <div className="flex justify-between">
            <span className="font-medium">Status:</span>
            <span className={product.isActive ? 'text-green-600' : 'text-red-600'}>
              {product.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
          {product.tags && product.tags.length > 0 && (
            <div className="flex justify-between">
              <span className="font-medium">Tags:</span>
              <div className="flex flex-wrap gap-1">
                {product.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <div className="flex justify-between">
            <span className="font-medium">Created:</span>
            <span>{new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Updated:</span>
            <span>{new Date(product.updatedAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      <button
        onClick={() => addToCart(product, 1)}
        className="mt-4 w-full rounded-full bg-blue-600 p-3 text-lg text-white hover:bg-blue-700"
      >
        Add to Cart
      </button>

      {/* {product.relatedProducts && product.relatedProducts.length > 0 && (
        <RelatedProductsList products={product.relatedProducts as Product[]} />
      )} */}
    </>
  )
}
