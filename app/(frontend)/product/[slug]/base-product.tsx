import { Gallery } from '@/components/product/gallery'
import { ProductDescription } from '@/components/product/product-description'
import type { Product } from '@/lib/client'

export const BaseProduct = ({ product }: { product: Product }) => {
  return (
    <div
      className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8"
      itemScope
      itemType="https://schema.org/Product"
    >
      <div className="h-full w-full basis-full lg:basis-4/6">
        <Gallery
          images={
            product.images?.map((image) => ({
              src: image.url || '',
              altText: image.altText || '',
            })) || []
          }
        />
      </div>
      <div className="basis-full lg:basis-2/6">
        <ProductDescription product={product} />
      </div>
    </div>
  )
}
