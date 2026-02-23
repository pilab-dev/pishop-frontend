import type { Block } from "payload";

export const BentoBoxBlock: Block = {
  slug: "bentoBox",
  interfaceName: "BentoBoxProps",
  imageURL: "/blocks/bento-box.webp",
  fields: [
    {
      name: "title",
      type: "text",
      admin: {
        description: "Optional title for this bento box section",
      },
    },
    {
      name: "items",
      type: "array",
      minRows: 1,
      maxRows: 6,
      admin: {
        description: "Add items to display in the bento box grid",
      },
      fields: [
        {
          name: "content",
          type: "richText",
          required: true,
          admin: {
            description: "Content to display in this bento box item",
          },
        },
        {
          name: "colSpan",
          type: "select",
          defaultValue: "1",
          options: [
            { label: "1 column", value: "1" },
            { label: "2 columns", value: "2" },
            { label: "3 columns", value: "3" },
          ],
          admin: {
            description: "How many columns this item should span",
          },
        },
        {
          name: "rowSpan",
          type: "select",
          defaultValue: "1",
          options: [
            { label: "1 row", value: "1" },
            { label: "2 rows", value: "2" },
            { label: "3 rows", value: "3" },
          ],
          admin: {
            description: "How many rows this item should span",
          },
        },
        {
          name: "backgroundColor",
          type: "select",
          defaultValue: "default",
          options: [
            { label: "Default (gray)", value: "default" },
            { label: "Primary", value: "primary" },
            { label: "Secondary", value: "secondary" },
            { label: "Accent", value: "accent" },
            { label: "White", value: "white" },
          ],
          admin: {
            description: "Background color for this bento box item",
          },
        },
        {
          name: "textAlign",
          type: "select",
          defaultValue: "center",
          options: [
            { label: "Left", value: "left" },
            { label: "Center", value: "center" },
            { label: "Right", value: "right" },
          ],
          admin: {
            description: "Text alignment within this item",
          },
        },
      ],
    },
    {
      name: "layout",
      type: "group",
      admin: {
        description: "Layout settings for the bento box",
      },
      fields: [
        {
          name: "columns",
          type: "select",
          defaultValue: "3",
          options: [
            { label: "2 columns", value: "2" },
            { label: "3 columns", value: "3" },
            { label: "4 columns", value: "4" },
          ],
          admin: {
            description: "Number of columns in the grid",
          },
        },
        {
          name: "gap",
          type: "select",
          defaultValue: "4",
          options: [
            { label: "Small (2)", value: "2" },
            { label: "Medium (4)", value: "4" },
            { label: "Large (6)", value: "6" },
          ],
          admin: {
            description: "Gap between grid items",
          },
        },
        {
          name: "maxWidth",
          type: "select",
          defaultValue: "1280",
          options: [
            { label: "Small (768px)", value: "768" },
            { label: "Medium (1024px)", value: "1024" },
            { label: "Large (1280px)", value: "1280" },
            { label: "Full width", value: "full" },
          ],
          admin: {
            description: "Maximum width of the bento box container",
          },
        },
      ],
    },
  ],
};
