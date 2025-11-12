import type { Block } from "payload";
import { productSelectField } from "@/fields/product-select";

export const BestSellersBlock: Block = {
  slug: "bestSellers",
  interfaceName: "BestSellersProps",
  imageURL: "/blocks/best-sellers.webp",
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Best Sellers",
      admin: {
        description: "Title for the best sellers section",
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
      defaultValue: "promotionalContent",
      options: [
        {
          label: "From Promotional Content",
          value: "promotionalContent",
        },
        {
          label: "Manual Selection",
          value: "manual",
        },
        {
          label: "Auto (Top Selling)",
          value: "auto",
        },
      ],
      admin: {
        description: "How to source the best-selling products",
      },
    },
    {
      name: "promotionalContent",
      type: "relationship",
      relationTo: "promotionalContent",
      admin: {
        description: "Select promotional content with best sellers",
        condition: (data) => data.source === "promotionalContent",
      },
      filterOptions: {
        type: { equals: "bestSellers" },
      },
    },
    {
      name: "products",
      label: "Best-selling products",
      type: "array",
      maxRows: 12,
      admin: {
        description: "Manually selected best-selling products",
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
          name: "salesRank",
          type: "number",
          admin: {
            description: "Sales rank/position (for display purposes)",
          },
        },
        {
          name: "badge",
          type: "text",
          defaultValue: "#1 Best Seller",
          admin: {
            description: "Badge text to display (automatically generated based on rank)",
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
      name: "autoSettings",
      type: "group",
      admin: {
        description: "Settings for automatic best seller selection",
        condition: (data) => data.source === "auto",
      },
      fields: [
        {
          name: "timeframe",
          type: "select",
          defaultValue: "30days",
          options: [
            { label: "Last 7 days", value: "7days" },
            { label: "Last 30 days", value: "30days" },
            { label: "Last 90 days", value: "90days" },
            { label: "All time", value: "all" },
          ],
          admin: {
            description: "Timeframe to consider for best sellers",
          },
        },
        {
          name: "category",
          type: "text",
          admin: {
            description: "Limit to specific category from storefront API (optional)",
          },
        },
        {
          name: "minSales",
          type: "number",
          defaultValue: 1,
          admin: {
            description: "Minimum sales threshold",
          },
        },
      ],
    },
    {
      name: "displaySettings",
      type: "group",
      admin: {
        description: "Display settings for the best sellers section",
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
              label: "List with Rankings",
              value: "rankedList",
            },
            {
              label: "Hero with Top Product",
              value: "hero",
            },
          ],
          admin: {
            description: "How to display the best sellers",
          },
        },
        {
          name: "columns",
          type: "select",
          defaultValue: "3",
          options: [
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
          name: "showRankings",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Show sales rankings/numbers",
          },
        },
        {
          name: "showBadges",
          type: "checkbox",
          defaultValue: true,
          admin: {
            description: "Show 'Best Seller' badges",
          },
        },
        {
          name: "maxItems",
          type: "number",
          defaultValue: 8,
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
        description: "Call-to-action settings",
      },
      fields: [
        {
          name: "text",
          type: "text",
          defaultValue: "Shop Best Sellers",
          admin: {
            description: "Button text",
          },
        },
        {
          name: "link",
          type: "text",
          admin: {
            description: "URL or path to link to (e.g., best-sellers collection)",
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
