import { Gallery } from '@/components/product/gallery'
import { ProductDescription } from '@/components/product/product-description'
import type { Product } from '@/lib/client'

export const BaseProduct = ({ product }: { product: Product }) => {
  return (
    <div
      className="flex flex-col gap-8 bg-white lg:flex-row lg:gap-12"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div className="h-full w-full basis-full lg:basis-1/2">
        <Gallery
          images={
            product.images?.map((image) => ({
              src: image.url || '',
              altText: image.altText || '',
            })) || []
          }
        />
      </div>
      <div className="basis-full lg:basis-1/2">
        <ProductDescription product={product} />
      </div>
    </div>
  )
}
