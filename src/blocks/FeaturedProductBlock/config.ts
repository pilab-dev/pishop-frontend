import type { Block } from "payload";
import { productSelectField } from "@/fields/product-select";

export const FeaturedProductBlock: Block = {
  slug: "featuredProduct",
  interfaceName: "FeaturedProductProps",
  imageURL: "/blocks/featured-product.webp",
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Featured Product",
    },
    productSelectField({
      name: "product",
      required: true,
    }),
  ],
};
