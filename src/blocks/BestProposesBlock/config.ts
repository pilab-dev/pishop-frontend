import type { Block } from 'payload'
import { productSelectField } from '@/fields/product-select'

const badgeIconOptions = [
  { label: 'Headphones', value: 'headphones' },
  { label: 'Watch', value: 'watch' },
  { label: 'Smartphone', value: 'smartphone' },
  { label: 'Camera', value: 'camera' },
  { label: 'Laptop', value: 'laptop' },
]

const badgeColorOptions = [
  { label: 'Red', value: 'red' },
  { label: 'Blue', value: 'blue' },
  { label: 'Green', value: 'green' },
]

export const BestProposesBlock: Block = {
  slug: 'bestProposes',
  interfaceName: 'BestProposesProps',
  imageURL: '/blocks/best-proposes.webp',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Best Proposes',
      admin: {
        description: 'Section heading (first letter is highlighted)',
      },
    },
    {
      name: 'tabs',
      type: 'array',
      maxRows: 4,
      admin: {
        description: 'Decorative tab labels shown above the section (e.g. Featured / One sale / Top rate)',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'primary',
      label: 'Primary product (large tile)',
      type: 'group',
      fields: [
        productSelectField({ required: true }),
        {
          name: 'badgeIcon',
          type: 'select',
          options: badgeIconOptions,
        },
        {
          name: 'badgeColor',
          type: 'select',
          options: badgeColorOptions,
          defaultValue: 'red',
        },
      ],
    },
    {
      name: 'secondary',
      label: 'Secondary products (stacked small tiles)',
      type: 'array',
      minRows: 0,
      maxRows: 2,
      fields: [
        productSelectField({ required: true }),
        {
          name: 'badgeIcon',
          type: 'select',
          options: badgeIconOptions,
        },
        {
          name: 'badgeColor',
          type: 'select',
          options: badgeColorOptions,
          defaultValue: 'blue',
        },
      ],
    },
  ],
}
