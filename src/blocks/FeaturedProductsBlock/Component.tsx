import React from "react";

import { TopSalesSection } from "@/components/products/top-sales-seection";
import { FeaturedProductsProps } from "@/payload-types";

type Props = FeaturedProductsProps & {};

export const FeaturedProductsBlock: React.FC<Props> = (props) => {
  const { products, blockType } = props;

  if (!products || products.length === 0) {
    return null;
  }

  return <TopSalesSection products={products} />;
};
