import type { Block } from "payload";
import { productSelectField } from "@/fields/product-select";

export const FeaturedProductsBlock: Block = {
  slug: "featuredProducts",
  interfaceName: "FeaturedProductsProps",
  imageURL: "/blocks/featured-items.webp",
  fields: [
    {
      name: "title",
      type: "text",
      admin: {
        description: "Optional title for this featured products section",
      },
    },
    {
      name: "subtitle",
      type: "text",
      admin: {
        description: "Optional subtitle for this section",
      },
    },
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
        condition: (data) => data.source === "promotionalContent",
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
        condition: (data) => data.source === "collection",
      },
    },
    {
      name: "products",
      label: "Products to display",
      type: "array",
      maxRows: 12,
      admin: {
        description: "Manually selected products to feature",
        condition: (data) => data.source === "manual",
      },
      fields: [
        productSelectField({
          name: "productId",
          required: true,
          overrides: {
            admin: {
              description: "Select product from storefront",
            },
          },
        }),
        {
          name: "overrideTitle",
          type: "text",
          admin: {
            description: "Optional custom title to display instead of product name",
          },
        },
        {
          name: "overrideDescription",
          type: "textarea",
          admin: {
            description: "Optional custom description to display",
          },
        },
        {
          name: "badge",
          type: "text",
          admin: {
            description: "Badge text to display (e.g., 'NEW', 'SALE', 'FEATURED')",
          },
        },
        {
          name: "sortOrder",
          type: "number",
          defaultValue: 0,
          admin: {
            description: "Sort order within this block",
          },
        },
      ],
    },
    {
      name: "displaySettings",
      type: "group",
      admin: {
        description: "Display settings for this featured products section",
      },
      fields: [
        {
          name: "layout",
          type: "select",
          defaultValue: "grid",
          options: [
            {
              label: "Grid",
              value: "grid",
            },
            {
              label: "Carousel",
              value: "carousel",
            },
            {
              label: "List",
              value: "list",
            },
            {
              label: "Hero",
              value: "hero",
            },
          ],
          admin: {
            description: "How to display the featured products",
          },
        },
        {
          name: "columns",
          type: "select",
          defaultValue: "3",
          options: [
            { label: "1 Column", value: "1" },
            { label: "2 Columns", value: "2" },
            { label: "3 Columns", value: "3" },
            { label: "4 Columns", value: "4" },
            { label: "6 Columns", value: "6" },
          ],
          admin: {
            description: "Number of columns (for grid layout)",
            condition: (data) => data.displaySettings?.layout === "grid",
          },
        },
        {
          name: "showPrice",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Show product prices",
          },
        },
        {
          name: "showBadges",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Show product badges",
          },
        },
        {
          name: "maxItems",
          type: "number",
          defaultValue: 6,
          min: 1,
          max: 12,
          admin: {
            description: "Maximum number of products to display",
          },
        },
      ],
    },
    {
      name: "callToAction",
      type: "group",
      admin: {
        description: "Call-to-action settings for this section",
      },
      fields: [
        {
          name: "text",
          type: "text",
          admin: {
            description: "Button text (e.g., 'Shop Now', 'View All')",
          },
        },
        {
          name: "link",
          type: "text",
          admin: {
            description: "URL or path to link to",
          },
        },
        {
          name: "style",
          type: "select",
          options: [
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Outline", value: "outline" },
            { label: "Link", value: "link" },
          ],
          defaultValue: "primary",
        },
      ],
    },
  ],
};
