import { AddToCart } from "@/components/cart/add-to-cart";
import Prose from "@/components/prose";
import { Product } from "@pilab/pishop-client";
import { FC } from "react";
import { VariantPrice } from "./variant-price";
import { VariantSelector } from "./variant-selector";

type ProductOption = {
  id: string;
  name: string;
  values: string[];
};

type ProductDescriptionProps = {
  product: Product;
};

export const ProductDescription: FC<ProductDescriptionProps> = ({
  product,
}) => {
  if (!product) return null;

  const productOptionsToOpts = (productOptions: {
    [key: string]: string;
  }): ProductOption[] =>
    Object.keys(productOptions).map(
      (key) =>
        ({
          id: key,
          name: key,
          values: productOptions[key]?.split(","),
        }) as ProductOption,
    );

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-red-700 p-2 text-sm text-white">
          {/* <Price
            amount={product.priceRange.maxVariantPrice.amount}
            currencyCode={product.priceRange.maxVariantPrice.currencyCode}
          /> */}

          <VariantPrice product={product} />
        </div>
      </div>
      <VariantSelector
        options={productOptionsToOpts(
          product.options as { [key: string]: string },
        )}
        variants={product.variants}
      />
      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}
      <AddToCart product={product} />
    </>
  );
};
