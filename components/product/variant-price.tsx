"use client";

import Price from "@/components/price";
import { Product, ProductVariant } from "@pilab/pishop-client";
import { FC } from "react";
import { useProduct } from "./product-context";

type VariantPriceProps = {
  product: Product;
};

export const VariantPrice: FC<VariantPriceProps> = ({ product }) => {
  const { variants } = product;
  const { state } = useProduct();

  console.log("product from variant-price", product);

  const variant = variants.find((variant: ProductVariant) =>
    variant.selectedOptions.every(
      (option) => option.value === state[option.name.toLowerCase()],
    ),
  );

  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  const selectedVariantId = variant?.id || defaultVariantId;
  const finalVariant = variants.find(
    (variant) => variant.id === selectedVariantId,
  )!;

  if (!finalVariant) {
    return (
      <Price
        amount={product.priceRange?.maxVariantPrice.amount.toString() || "0"}
        currencyCode={product.priceRange?.maxVariantPrice.currencyCode || "HUF"}
      />
    );
  }

  return (
    <Price
      amount={finalVariant.price.amount.toString()}
      currencyCode={finalVariant.price.currencyCode}
    />
  );
};
