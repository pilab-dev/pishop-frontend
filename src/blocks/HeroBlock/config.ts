import type { Block } from 'payload'

import { productSelectField } from '@/fields/product-select'

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlockProps',
  imageURL: '/blocks/hero.webp',
  fields: [
    {
      name: 'product',
      label: 'Product',
      type: 'group',
      admin: {
        description: 'Select a product to display in the hero section',
      },
      fields: [
        productSelectField({
          name: 'productSlug',
          required: true,
          overrides: {
            admin: {
              description: 'Select product slug from storefront to feature in hero section',
            },
          },
        }),
      ],
    },
  ],
}

