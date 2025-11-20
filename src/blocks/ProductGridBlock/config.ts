import type { Block } from "payload";
import { productSelectField } from "@/fields/product-select";

export const ProductGridBlock: Block = {
  slug: "productGrid",
  interfaceName: "ProductGridProps",
  imageURL: "/blocks/product-grid.webp",
  fields: [
    {
      name: "title",
      type: "text",
      admin: {
        description: "Optional title for this product grid section",
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
          label: "From Collection",
          value: "collection",
        },
        {
          label: "Latest Products",
          value: "latest",
        },
        {
          label: "Featured Products",
          value: "featured",
        },
      ],
      admin: {
        description: "How to source the products for this grid",
      },
    },
    {
      name: "collection",
      type: "text",
      admin: {
        description: "Select collection from storefront API to display products from",
        condition: (data) => data.source === "collection",
      },
    },
    {
      name: "products",
      label: "Products to display",
      type: "array",
      maxRows: 20,
      admin: {
        description: "Manually selected products to display in the grid",
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
        description: "Display settings for this product grid",
      },
      fields: [
        {
          name: "view",
          type: "select",
          defaultValue: "grid",
          options: [
            {
              label: "Grid View",
              value: "grid",
            },
            {
              label: "List View",
              value: "list",
            },
          ],
          admin: {
            description: "Display products in grid or list format",
          },
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
            description: "Number of columns (for grid view only)",
            condition: (data) => data.displaySettings?.view === "grid",
          },
        },
        {
          name: "maxItems",
          type: "number",
          defaultValue: 12,
          min: 1,
          max: 20,
          admin: {
            description: "Maximum number of products to display",
          },
        },
        {
          name: "showPrices",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Show product prices",
          },
        },
        {
          name: "showButtons",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Show product action buttons (add to cart, etc.)",
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
            description: "Button text (e.g., 'View All Products', 'Shop Now')",
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
