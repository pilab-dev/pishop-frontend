import type { Block } from 'payload'
import { productSelectField } from '@/fields/product-select'

export const PopularProductBlock: Block = {
  slug: 'popularProduct',
  interfaceName: 'PopularProductProps',
  imageURL: '/blocks/popular-product.webp',
  fields: [
    {
      name: 'title',
      type: 'text',
      defaultValue: 'Popular Product',
      admin: {
        description: 'Section heading (first letter is highlighted)',
      },
    },
    {
      name: 'categories',
      label: 'Category tabs',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      admin: {
        description: 'Each tab shows its own icon and product grid',
      },
      fields: [
        {
          name: 'label',
          type: 'text',
          required: true,
        },
        {
          name: 'icon',
          type: 'select',
          required: true,
          defaultValue: 'headphones',
          options: [
            { label: 'Headphones', value: 'headphones' },
            { label: 'Watch', value: 'watch' },
            { label: 'Smartphone', value: 'smartphone' },
            { label: 'Gamepad', value: 'gamepad' },
            { label: 'Laptop', value: 'laptop' },
            { label: 'TV / Monitor', value: 'tv' },
          ],
        },
        {
          name: 'products',
          type: 'array',
          minRows: 1,
          maxRows: 8,
          fields: [productSelectField({ required: true })],
        },
      ],
    },
  ],
}
