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
          name: "heading",
          type: "text",
          required: true,
          admin: {
            description: 'Tile headline, e.g. "Fly Camera"',
          },
        },
        {
          name: "subheading",
          type: "text",
          admin: {
            description: 'Short line under the heading, e.g. "Hot Product"',
          },
        },
        {
          name: "priceText",
          type: "text",
          admin: {
            description: 'Freeform price/offer text, e.g. "From $1200" or "Up to 45% off"',
          },
        },
        {
          name: "ctaText",
          type: "text",
          admin: {
            description: 'Optional button label, e.g. "Buy now"',
          },
        },
        {
          name: "link",
          type: "text",
        },
      ],
    },
  ],
};
