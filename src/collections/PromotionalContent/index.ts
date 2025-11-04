import type { CollectionConfig } from 'payload'

export const PromotionalContent: CollectionConfig<'promotionalContent'> = {
  slug: 'promotionalContent',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'isActive', 'priority'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        description: 'Display title for this promotional content',
      },
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        {
          label: 'Featured Products',
          value: 'featuredProducts',
        },
        {
          label: 'Best Sellers',
          value: 'bestSellers',
        },
        {
          label: 'Promotional Campaign',
          value: 'campaign',
        },
        {
          label: 'Seasonal Promotion',
          value: 'seasonal',
        },
        {
          label: 'Flash Sale',
          value: 'flashSale',
        },
      ],
      admin: {
        description: 'Type of promotional content',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Description of this promotional content',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Whether this promotional content is currently active',
      },
    },
    {
      name: 'priority',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Priority order (higher numbers appear first)',
        step: 1,
      },
    },
    {
      name: 'startDate',
      type: 'date',
      admin: {
        description: 'When this promotion should start (optional)',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: {
        description: 'When this promotion should end (optional)',
        date: {
          pickerAppearance: 'dayOnly',
        },
      },
    },
    {
      name: 'products',
      type: 'array',
      admin: {
        description: 'Products to feature in this promotional content',
        condition: (data) => ['featuredProducts', 'bestSellers', 'campaign'].includes(data.type),
      },
      fields: [
        {
          name: 'productId',
          type: 'text',
          required: true,
          admin: {
            description: 'Product ID or slug from the webshop engine',
          },
        },
        {
          name: 'overrideTitle',
          type: 'text',
          admin: {
            description: 'Optional custom title to display instead of product name',
          },
        },
        {
          name: 'overrideDescription',
          type: 'textarea',
          admin: {
            description: 'Optional custom description to display',
          },
        },
        {
          name: 'badge',
          type: 'text',
          admin: {
            description: 'Badge text to display (e.g., "NEW", "SALE", "BEST SELLER")',
          },
        },
        {
          name: 'sortOrder',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Sort order within this promotional content',
          },
        },
      ],
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description: 'Hero image for this promotional content',
        condition: (data) => ['campaign', 'seasonal', 'flashSale'].includes(data.type),
      },
    },
    {
      name: 'callToAction',
      type: 'group',
      admin: {
        description: 'Call-to-action settings',
      },
      fields: [
        {
          name: 'text',
          type: 'text',
          admin: {
            description: 'Button text',
          },
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'URL or path to link to',
          },
        },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
    {
      name: 'metadata',
      type: 'group',
      admin: {
        description: 'SEO and display metadata',
      },
      fields: [
        {
          name: 'seoTitle',
          type: 'text',
          admin: {
            description: 'SEO title override',
          },
        },
        {
          name: 'seoDescription',
          type: 'textarea',
          admin: {
            description: 'SEO description override',
          },
        },
        {
          name: 'displayStyle',
          type: 'select',
          options: [
            { label: 'Grid', value: 'grid' },
            { label: 'Carousel', value: 'carousel' },
            { label: 'List', value: 'list' },
            { label: 'Hero', value: 'hero' },
          ],
          defaultValue: 'grid',
          admin: {
            description: 'How to display this promotional content',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [
      async ({ doc, req: { payload } }) => {
        // Revalidate related pages when promotional content changes
        payload.logger.info(`Revalidating promotional content: ${doc.title}`)
        // This would trigger revalidation of pages that use this promotional content
        // Implementation depends on how promotional content is used in pages
      },
    ],
  },
}
