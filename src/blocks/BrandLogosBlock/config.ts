import type { Block } from "payload";

export const BrandLogosBlock: Block = {
  slug: "brandLogos",
  interfaceName: "BrandLogosProps",
  imageURL: "/blocks/brand-logos.webp",
  fields: [
    {
      name: "title",
      type: "text",
      admin: {
        description: "Admin label (not shown on frontend)",
      },
    },
    {
      name: "logos",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "link",
          type: "text",
        },
      ],
    },
  ],
};
