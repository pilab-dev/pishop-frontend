import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  admin: {
    group: 'Content',
    description: 'The footer content of the website. It includes the logo, contact information, quick links, and copyright text.',
    preview: ({ slug }) => {
      const encodedParams = new URLSearchParams({
        slug: typeof slug === 'string' ? slug : 'home',
        collection: 'pages',
        path: `/${slug}`,
        previewSecret: process.env.PREVIEW_SECRET || '',
      })

      return `/preview?${encodedParams.toString()}` 
    },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'The logo to display in the footer.',
      },
    },
    {
      type: 'group',
      label: 'Contact information',
      name: 'contactInformation',
      admin: {
        description: 'The contact information to display in the footer.',
      },
      fields: [
        {
          name: 'contactEmail',
          type: 'text',
          label: 'Contact email',
          required: true,
          admin: {
            description: 'The email address to display in the footer.'  ,
          },
          defaultValue: 'shop@pilab.hu',
        },
        {
          name: 'contactPhone',
          type: 'text',
          label: 'Contact phone',
          required: true,
          admin: {
            description: 'The phone number to display in the footer.',
          },
          defaultValue: '+36 70 171 2997',
        },
        {
          name: 'contactAddress',
          type: 'text',
          label: 'Contact address',
          required: true,
          admin: {
            description: 'The address to display in the footer.',
          },
          defaultValue: 'HU 1067 Budapest, Bajza u. 1',
        },
      ],
    },
    {
      label: 'Quick links',
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/Footer/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'copy',
      type: 'text',
      label: 'Copyright text',
      required: true,
      defaultValue: `© 2024-${new Date().getFullYear()}, PiShop by Progressive Innovation LAB`,
      admin: {
        description: 'The copyright text to display in the footer.',
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
