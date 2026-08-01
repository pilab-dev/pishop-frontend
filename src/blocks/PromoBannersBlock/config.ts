import type { Block } from "payload";

export const PromoBannersBlock: Block = {
  slug: "promoBanners",
  interfaceName: "PromoBannersProps",
  imageURL: "/blocks/promo-banners.webp",
  fields: [
    {
      name: "title",
      type: "text",
      admin: {
        description: "Admin label (not shown on frontend)",
      },
    },
    {
      name: "banners",
      type: "array",
      maxRows: 3,
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
