import type { CollectionConfig } from "payload";

import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import { slugField } from "../fields/slug";

export const Collections: CollectionConfig = {
  slug: "collections",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "description",
      type: "richText",
      required: true,
    },
    {
      name: "featuredProducts",
      label: "Featured Products",
      type: "array",
      admin: {
        description: "Product slugs to feature in this collection",
      },
      fields: [
        {
          name: "slug",
          type: "text",
          label: "Product Slug",
          required: true,
          admin: {
            description: "The slug/handle of the product to feature",
          },
        },
      ],
    },
    ...slugField(),
  ],
};
