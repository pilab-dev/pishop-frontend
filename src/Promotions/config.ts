import type { GlobalConfig } from 'payload'

import { revalidatePromotions } from './hooks/revalidatePromotions'

export const Promotions: GlobalConfig = {
  slug: 'promotions',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
  },
  fields: [
    {
      name: 'sitewideBanner',
      type: 'group',
      admin: {
        description: 'Site-wide promotional banner settings',
      },
      fields: [
        {
          name: 'isEnabled',
          type: 'checkbox',
          defaultValue: false,
          admin: {
            description: 'Show site-wide promotional banner',
          },
        },
        {
          name: 'message',
          type: 'text',
          admin: {
            description: 'Banner message text',
            condition: (data) => data.sitewideBanner?.isEnabled,
          },
        },
        {
          name: 'backgroundColor',
          type: 'text',
          defaultValue: '#000000',
          admin: {
            description: 'Background color (hex code)',
            condition: (data) => data.sitewideBanner?.isEnabled,
          },
        },
        {
          name: 'textColor',
          type: 'text',
          defaultValue: '#ffffff',
          admin: {
            description: 'Text color (hex code)',
            condition: (data) => data.sitewideBanner?.isEnabled,
          },
        },
        {
          name: 'link',
          type: 'text',
          admin: {
            description: 'Optional link URL',
            condition: (data) => data.sitewideBanner?.isEnabled,
          },
        },
        {
          name: 'dismissible',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Allow users to dismiss the banner',
            condition: (data) => data.sitewideBanner?.isEnabled,
          },
        },
      ],
    },
    {
      name: 'featuredContent',
      type: 'array',
      maxRows: 6,
      admin: {
        description: 'Featured promotional content to display on homepage/landing pages',
      },
      fields: [
        {
          name: 'promotionalContent',
          type: 'relationship',
          relationTo: 'promotionalContent',
          required: true,
          admin: {
            description: 'Select promotional content to feature',
          },
        },
        {
          name: 'displayOrder',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Display order (higher numbers appear first)',
          },
        },
      ],
    },
    {
      name: 'homepageSections',
      type: 'array',
      admin: {
        description: 'Define homepage promotional sections',
      },
      fields: [
        {
          name: 'sectionType',
          type: 'select',
          required: true,
          options: [
            { label: 'Hero Banner', value: 'hero' },
            { label: 'Featured Products', value: 'featuredProducts' },
            { label: 'Best Sellers', value: 'bestSellers' },
            { label: 'Promotional Campaign', value: 'campaign' },
            { label: 'Category Showcase', value: 'categoryShowcase' },
          ],
        },
        {
          name: 'title',
          type: 'text',
          admin: {
            description: 'Section title',
          },
        },
        {
          name: 'subtitle',
          type: 'text',
          admin: {
            description: 'Section subtitle',
          },
        },
        {
          name: 'content',
          type: 'relationship',
          relationTo: 'promotionalContent',
          admin: {
            description: 'Link to promotional content (if applicable)',
            condition: (data) => ['featuredProducts', 'bestSellers', 'campaign'].includes(data.sectionType),
          },
        },
        {
          name: 'collection',
          type: 'text',
          admin: {
            description: 'Link to collection from storefront API (for category showcase)',
            condition: (data) => data.sectionType === 'categoryShowcase',
          },
        },
        {
          name: 'isEnabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Enable this section',
          },
        },
        {
          name: 'sortOrder',
          type: 'number',
          defaultValue: 0,
          admin: {
            description: 'Display order',
          },
        },
      ],
    },
    {
      name: 'newsletterPromotion',
      type: 'group',
      admin: {
        description: 'Newsletter signup promotional settings',
      },
      fields: [
        {
          name: 'isEnabled',
          type: 'checkbox',
          defaultValue: true,
          admin: {
            description: 'Show newsletter promotion',
          },
        },
        {
          name: 'title',
          type: 'text',
          defaultValue: 'Stay Updated',
          admin: {
            description: 'Newsletter promotion title',
            condition: (data) => data.newsletterPromotion?.isEnabled,
          },
        },
        {
          name: 'description',
          type: 'textarea',
          defaultValue: 'Subscribe to our newsletter for exclusive deals and updates',
          admin: {
            description: 'Newsletter promotion description',
            condition: (data) => data.newsletterPromotion?.isEnabled,
          },
        },
        {
          name: 'discountCode',
          type: 'text',
          admin: {
            description: 'Discount code to offer for newsletter signup',
            condition: (data) => data.newsletterPromotion?.isEnabled,
          },
        },
      ],
    },
    {
      name: 'seoSettings',
      type: 'group',
      admin: {
        description: 'SEO settings for promotional content',
      },
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          admin: {
            description: 'Default meta title for promotional pages',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          admin: {
            description: 'Default meta description for promotional pages',
          },
        },
        {
          name: 'openGraphImage',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Default Open Graph image for promotional content',
          },
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePromotions],
  },
}
