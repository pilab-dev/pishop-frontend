import type { Block } from "payload";
import { productSelectField } from "@/fields/product-select";

export const FeaturedProductsBlock: Block = {
  slug: "featuredProducts",
  interfaceName: "FeaturedProductsProps",
  imageURL: "/blocks/featured-items.webp",
  fields: [
    {
      name: "source",
      type: "select",
      required: true,
      defaultValue: "manual",
      options: [
        {
          label: "Manual Selection",
          value: "manual",
        },
        {
          label: "From Promotional Content",
          value: "promotionalContent",
        },
        {
          label: "From Collection",
          value: "collection",
        },
      ],
      admin: {
        description: "How to source the featured products",
      },
    },
    {
      name: "promotionalContent",
      type: "relationship",
      relationTo: "promotionalContent",
      admin: {
        description: "Select promotional content to display",
        condition: (_, data) => data.source === "promotionalContent",
      },
      filterOptions: {
        type: { equals: "featuredProducts" },
      },
    },
    {
      name: "collection",
      type: "text",
      admin: {
        description: "Select collection from storefront API to feature products from",
        condition: (_, data) => data.source === "collection",
      },
    },
    {
      name: "products",
      label: "Products to display",
      type: "array",
      maxRows: 3,
      minRows: 3,
      admin: {
        description: "Manually selected products to feature",
        condition: (_, data) => data.source === "manual",
      },
      required: true,
      fields: [
        productSelectField({
          name: "productSlug",
          required: true,
          width: '33%',
          overrides: {
            admin: {
              description: "Select product from storefront",
            },
          },
        }),
      ],
    },
  ],
};
