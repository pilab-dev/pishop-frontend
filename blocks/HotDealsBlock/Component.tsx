import type { StaticImageData } from "next/image";

import { cn } from "@/utilities/ui";
import React from "react";

import { HotDealsSection } from "@/components/products/hot-deals-section";
import type {
  HotDealsBlock as HotDealsBlockComponentProps,
  Product,
} from "@/payload-types";

type Props = HotDealsBlockComponentProps & {
  breakout?: boolean;
  captionClassName?: string;
  className?: string;
  enableGutter?: boolean;
  imgClassName?: string;
  staticImage?: StaticImageData;
  disableInnerContainer?: boolean;
};

export const HotDealsBlockComponent: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    products,
    staticImage,
    disableInnerContainer,
  } = props;

  return (
    <div
      className={cn(
        "",
        {
          container: enableGutter,
        },
        className,
      )}
    >
      <HotDealsSection
        products={
          products
            .map((product) => product.product)
            .filter((product) => product !== null) as Product[]
        }
      />
    </div>
  );
};
