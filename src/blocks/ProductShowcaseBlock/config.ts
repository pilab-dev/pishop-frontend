import type { Block } from "payload";
import { productSelectField } from "@/fields/product-select";

export const ProductShowcaseBlock: Block = {
  slug: "productShowcase",
  interfaceName: "ProductShowcaseProps",
  imageURL: "/blocks/product-showcase.webp",
  fields: [
    {
      name: "title",
      type: "text",
      admin: {
        description: "Optional title for this showcase section",
      },
    },
    {
      name: "subtitle",
      type: "text",
      admin: {
        description: "Optional subtitle",
      },
    },
    {
      name: "showcaseType",
      type: "select",
      required: true,
      defaultValue: "products",
      options: [
        {
          label: "Product Grid",
          value: "products",
        },
        {
          label: "Category Showcase",
          value: "category",
        },
        {
          label: "Collection Preview",
          value: "collection",
        },
        {
          label: "Brand Showcase",
          value: "brand",
        },
        {
          label: "Seasonal Products",
          value: "seasonal",
        },
      ],
      admin: {
        description: "Type of content to showcase",
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
          label: "Dynamic (Auto-populated)",
          value: "dynamic",
        },
      ],
      admin: {
        description: "How to source the showcase content",
      },
    },
    {
      name: "category",
      type: "text",
      admin: {
        description: "Select category to showcase (from storefront API)",
        condition: (data) => data.showcaseType === "category",
      },
    },
    {
      name: "collection",
      type: "text",
      admin: {
        description: "Select collection to showcase (from storefront API)",
        condition: (data) => data.showcaseType === "collection",
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
    },
    {
      name: "products",
      type: "array",
      maxRows: 20,
      admin: {
        description: "Products to showcase",
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
          name: "highlight",
          type: "checkbox",
          admin: {
            description: "Highlight this product (larger, different styling)",
          },
        },
        {
          name: "customTitle",
          type: "text",
          admin: {
            description: "Custom display title",
          },
        },
        {
          name: "badge",
          type: "text",
          admin: {
            description: "Badge text (e.g., 'NEW', 'POPULAR')",
          },
        },
      ],
    },
    {
      name: "dynamicSettings",
      type: "group",
      admin: {
        description: "Settings for dynamic content",
        condition: (data) => data.source === "dynamic",
      },
      fields: [
        {
          name: "sortBy",
          type: "select",
          defaultValue: "newest",
          options: [
            { label: "Newest First", value: "newest" },
            { label: "Price: Low to High", value: "priceAsc" },
            { label: "Price: High to Low", value: "priceDesc" },
            { label: "Most Popular", value: "popular" },
            { label: "Best Selling", value: "bestSelling" },
            { label: "Random", value: "random" },
          ],
        },
        {
          name: "filterBy",
          type: "group",
          fields: [
            {
              name: "category",
              type: "text",
              admin: {
                description: "Filter by category (from storefront API)",
              },
            },
            {
              name: "priceRange",
              type: "group",
              fields: [
                {
                  name: "min",
                  type: "number",
                  admin: {
                    description: "Minimum price",
                  },
                },
                {
                  name: "max",
                  type: "number",
                  admin: {
                    description: "Maximum price",
                  },
                },
              ],
            },
            {
              name: "tags",
              type: "text",
              admin: {
                description: "Filter by tags (comma-separated)",
              },
            },
          ],
        },
      ],
    },
    {
      name: "layout",
      type: "group",
      admin: {
        description: "Layout and display settings",
      },
      fields: [
        {
          name: "style",
          type: "select",
          defaultValue: "grid",
          options: [
            { label: "Grid", value: "grid" },
            { label: "Carousel", value: "carousel" },
            { label: "Masonry", value: "masonry" },
            { label: "List", value: "list" },
            { label: "Hero + Grid", value: "heroGrid" },
          ],
        },
        {
          name: "columns",
          type: "select",
          defaultValue: "4",
          options: [
            { label: "2 Columns", value: "2" },
            { label: "3 Columns", value: "3" },
            { label: "4 Columns", value: "4" },
            { label: "5 Columns", value: "5" },
            { label: "6 Columns", value: "6" },
          ],
          admin: {
            condition: (data) => ["grid", "masonry"].includes(data.layout?.style),
          },
        },
        {
          name: "aspectRatio",
          type: "select",
          defaultValue: "square",
          options: [
            { label: "Square (1:1)", value: "square" },
            { label: "Portrait (3:4)", value: "portrait" },
            { label: "Landscape (4:3)", value: "landscape" },
            { label: "Wide (16:9)", value: "wide" },
          ],
        },
        {
          name: "spacing",
          type: "select",
          defaultValue: "normal",
          options: [
            { label: "Tight", value: "tight" },
            { label: "Normal", value: "normal" },
            { label: "Loose", value: "loose" },
          ],
        },
      ],
    },
    {
      name: "contentSettings",
      type: "group",
      admin: {
        description: "What content to show on products",
      },
      fields: [
        {
          name: "showTitle",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "showPrice",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "showComparePrice",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "showBadges",
          type: "checkbox",
          defaultValue: true,
        },
        {
          name: "showQuickAdd",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "Show quick add to cart button",
          },
        },
        {
          name: "hoverEffect",
          type: "select",
          defaultValue: "zoom",
          options: [
            { label: "Zoom Image", value: "zoom" },
            { label: "Lift Card", value: "lift" },
            { label: "Show Overlay", value: "overlay" },
            { label: "None", value: "none" },
          ],
        },
      ],
    },
    {
      name: "callToAction",
      type: "group",
      admin: {
        description: "Section call-to-action",
      },
      fields: [
        {
          name: "text",
          type: "text",
          admin: {
            description: "Button text",
          },
        },
        {
          name: "link",
          type: "text",
          admin: {
            description: "URL or path",
          },
        },
        {
          name: "position",
          type: "select",
          options: [
            { label: "End of section", value: "end" },
            { label: "Top right", value: "topRight" },
            { label: "Bottom center", value: "bottomCenter" },
          ],
          defaultValue: "end",
        },
      ],
    },
  ],
};
