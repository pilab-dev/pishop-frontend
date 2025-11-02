import type { Block } from "payload";

export const FeaturedProductsBlock: Block = {
  slug: "featuredProducts",
  interfaceName: "FeaturedProductsProps",
  imageURL: "/blocks/featured-items.png",
  fields: [
    {
      name: "products",
      label: "Products to display",
      type: "array",
      defaultValue: [{}, {}, {}],
      maxRows: 3,
      minRows: 3,
      fields: [
        {
          name: "product",
          type: "text",
        },
        {
          name: "tileType",
          type: "select",
          options: [
            {
              label: "Default",
              value: "default",
            },
          ],
          defaultValue: "default",
        },
      ],
      required: true,
    },
  ],
};
