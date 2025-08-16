import type { Block } from "payload";

export const HotDealsBlock: Block = {
  slug: "hotDealsBlock",
  interfaceName: "HotDealsBlock",
  imageURL:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSG2jQIALruZuRixGfjobCslDu8Su260HsruA&s",
  fields: [
    {
      name: "products",
      type: "array",
      maxRows: 3,
      minRows: 3,
      fields: [
        {
          name: "product",
          type: "relationship",
          relationTo: "products",
        },
      ],
      required: true,
    },
  ],
};
