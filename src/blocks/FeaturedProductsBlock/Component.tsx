import React from "react";

import { TopSalesSection } from "@/components/products/top-sales-seection";
import { FeaturedProductsProps } from "@/payload-types";

type Props = FeaturedProductsProps & {};

export const FeaturedProductsBlock: React.FC<Props> = (props) => {
  return <TopSalesSection />;
};
