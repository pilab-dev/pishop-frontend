import type { Block } from "payload";
import { productSelectField } from "@/fields/product-select";

export const HeroSliderBlock: Block = {
  slug: "heroSlider",
  interfaceName: "HeroSliderProps",
  imageURL: "/blocks/hero-slider.webp", // optional
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Hero Slider",
      admin: {
        description: "Admin label for this block",
      },
    },
    {
      name: "slides",
      type: "array",
      minRows: 1,
      maxRows: 5,
      required: true,
      fields: [
        productSelectField({
          name: "product",
          required: true,
        }),
        {
          name: "badgeText",
          type: "text",
          admin: {
            description: "Text shown above the product name (e.g. 'Featured', 'Best Price')",
          },
        },
        {
          name: "overrideTitle",
          type: "text",
          admin: {
            description: "Override the product name in the slide",
          },
        },
        {
          name: "overrideDescription",
          type: "textarea",
          admin: {
            description: "Override the product description in the slide",
          },
        },
        {
          name: "backgroundImage",
          type: "upload",
          relationTo: "media",
          admin: {
            description: "Optional background image for this slide",
          },
        },
      ],
    },
  ],
};
