import Prose from "@/components/prose";
import { Product } from "@/payload-types";
import { FC } from "react";

type ProductDescriptionProps = {
  product: Product;
};

export const ProductDescription: FC<ProductDescriptionProps> = ({
  product,
}) => {
  if (!product) return null;

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-red-700 p-2 text-sm text-white">
          {/* <VariantPrice product={product} /> */}
        </div>
      </div>
      {/* <VariantSelector options={product.options} variants={product.variants} /> */}
      {product.bodyHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.description}
        />
      ) : null}
      {/* <AddToCart product={product} /> */}
    </>
  );
};
