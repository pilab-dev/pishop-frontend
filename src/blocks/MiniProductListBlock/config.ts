import type { Block } from "payload";
import { productSelectField } from "@/fields/product-select";

export const MiniProductListBlock: Block = {
  slug: "miniProductList",
  interfaceName: "MiniProductListProps",
  imageURL: "/blocks/mini-product-list.webp",
  fields: [
    {
      name: "title",
      type: "text",
      admin: {
        description: "Admin label (not shown on frontend)",
      },
    },
    {
      name: "newArrivals",
      label: "New Arrivals",
      type: "array",
      maxRows: 3,
      fields: [productSelectField({ name: "product", required: true })],
    },
    {
      name: "topRated",
      label: "Top Rated",
      type: "array",
      maxRows: 3,
      fields: [productSelectField({ name: "product", required: true })],
    },
    {
      name: "bestSellers",
      label: "Best Sellers",
      type: "array",
      maxRows: 3,
      fields: [productSelectField({ name: "product", required: true })],
    },
  ],
};
