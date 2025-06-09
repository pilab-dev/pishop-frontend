import { Suspense } from "react";

import { Gallery } from "@/components/product/gallery";
import { ProductDescription } from "@/components/product/product-description";
import { Product, ProductImage } from "@/lib/pishop-client";

export const BaseProduct = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
      <div className="h-full w-full basis-full lg:basis-4/6">
        <Suspense
          fallback={
            <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden" />
          }
        >
          <Gallery
            images={product.images.slice(0, 5).map((image: ProductImage) => ({
              src: image.url,
              altText: image.altText,
            }))}
          />
        </Suspense>
      </div>
      <div className="basis-full lg:basis-2/6">
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDescription product={product} />
        </Suspense>
      </div>
    </div>
  );
};
