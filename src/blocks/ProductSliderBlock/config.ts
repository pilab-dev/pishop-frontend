import type { Block } from 'payload'
import { productSelectField } from '@/fields/product-select'

export const ProductSliderBlock: Block = {
  slug: 'productSlider',
  interfaceName: 'ProductSliderProps',
  imageURL: '/blocks/product-slider.webp',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Featured Products',
      admin: {
        description: 'Section heading',
      },
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        description: 'Optional subtitle below the heading',
      },
    },
    {
      name: 'products',
      type: 'array',
      minRows: 2,
      maxRows: 20,
      fields: [
        productSelectField({ required: true }),
      ],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '4',
      options: [
        { label: '3 columns', value: '3' },
        { label: '4 columns', value: '4' },
        { label: '5 columns', value: '5' },
      ],
      admin: {
        description: 'Number of visible columns on desktop',
      },
    },
    {
      name: 'showPrice',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        description: 'Show product prices',
      },
    },
  ],
}
