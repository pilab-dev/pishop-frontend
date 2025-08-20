import { Gallery } from "@/components/product/gallery";
import { ProductDescription } from "@/components/product/product-description";
import { Product } from "@/payload-types";

export const BaseProduct = ({ product }: { product: Product }) => {
  return (
    <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
      <div className="h-full w-full basis-full lg:basis-4/6">
        <Gallery
          images={
            product.images?.slice(0, 5).map((image) => ({
              src: (typeof image.image === 'object' ? image.image.url : '') || '',
              altText: image.alt || '',
            })) || []
          }
        />
      </div>
      <div className="basis-full lg:basis-2/6">
        <ProductDescription product={product} />
      </div>
    </div>
  );
};
