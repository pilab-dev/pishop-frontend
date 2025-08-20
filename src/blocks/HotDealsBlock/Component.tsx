import React from "react";

import { HotDealsSection } from "@/components/products/hot-deals-section";
import type {
  HotDealsBlock as HotDealsBlockComponentProps,
  Product,
} from "@/payload-types";

type Props = HotDealsBlockComponentProps & {};

export const HotDealsBlock: React.FC<Props> = ({ products }) => {
  return (
    <HotDealsSection
      products={
        products
          .map((product) => product.product)
          .filter((product) => product !== null) as Product[]
      }
    />
  );
};
