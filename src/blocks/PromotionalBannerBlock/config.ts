import type { Block } from "payload";

export const PromotionalBannerBlock: Block = {
  slug: "promotionalBanner",
  interfaceName: "PromotionalBannerProps",
  imageURL: "/blocks/promotional-banner.webp",
  fields: [
    {
      name: "content",
      type: "richText",
      required: true,
      admin: {
        description: "Banner content (text, links, etc.)",
      },
    },
    {
      name: "backgroundImage",
      type: "upload",
      relationTo: "media",
      admin: {
        description: "Background image for the banner (optional)",
      },
    },
    {
      name: "backgroundColor",
      type: "text",
      defaultValue: "#000000",
      admin: {
        description: "Background color (hex code) - used if no background image",
      },
    },
    {
      name: "textColor",
      type: "text",
      defaultValue: "#ffffff",
      admin: {
        description: "Text color (hex code)",
      },
    },
    {
      name: "height",
      type: "select",
      defaultValue: "medium",
      options: [
        { label: "Small", value: "small" },
        { label: "Medium", value: "medium" },
        { label: "Large", value: "large" },
        { label: "Full Height", value: "full" },
      ],
      admin: {
        description: "Banner height",
      },
    },
    {
      name: "alignment",
      type: "select",
      defaultValue: "center",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
      admin: {
        description: "Content alignment",
      },
    },
    {
      name: "callToAction",
      type: "group",
      admin: {
        description: "Call-to-action button settings",
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
            { label: "Ghost", value: "ghost" },
          ],
          defaultValue: "primary",
        },
        {
          name: "position",
          type: "select",
          options: [
            { label: "Inline with text", value: "inline" },
            { label: "Below text", value: "below" },
          ],
          defaultValue: "inline",
        },
      ],
    },
    {
      name: "behavior",
      type: "group",
      admin: {
        description: "Banner behavior settings",
      },
      fields: [
        {
          name: "dismissible",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "Allow users to dismiss the banner",
          },
        },
        {
          name: "sticky",
          type: "checkbox",
          defaultValue: false,
          admin: {
            description: "Make banner sticky/fixed position",
          },
        },
        {
          name: "animation",
          type: "select",
          defaultValue: "none",
          options: [
            { label: "None", value: "none" },
            { label: "Fade In", value: "fadeIn" },
            { label: "Slide Down", value: "slideDown" },
            { label: "Pulse", value: "pulse" },
          ],
          admin: {
            description: "Entrance animation",
          },
        },
      ],
    },
    {
      name: "scheduling",
      type: "group",
      admin: {
        description: "When to show this banner",
      },
      fields: [
        {
          name: "startDate",
          type: "date",
          admin: {
            description: "Start showing banner from this date",
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: "endDate",
          type: "date",
          admin: {
            description: "Stop showing banner after this date",
            date: {
              pickerAppearance: 'dayAndTime',
            },
          },
        },
        {
          name: "targetAudience",
          type: "select",
          options: [
            { label: "All Visitors", value: "all" },
            { label: "New Visitors", value: "new" },
            { label: "Returning Visitors", value: "returning" },
            { label: "Logged In Users", value: "authenticated" },
          ],
          defaultValue: "all",
          admin: {
            description: "Target specific audience",
          },
        },
      ],
    },
  ],
};
