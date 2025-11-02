import type { CustomComponent, CustomPreviewButton, GlobalConfig } from 'payload'

import { collectionSelectField } from '@/fields/collection-select'
import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { getServerSideURL } from '@/utilities/getURL'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  admin: {
    group: 'Content',
    description: 'The header of the website.',
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'The logo to display in the header.',
      }
    },
    {
      label: 'Navigation items',
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      minRows: 2,
      maxRows: 6,
      required: true,
      admin: {
        isSortable: true,
        description: 'The navigation items to display in the header.',
        initCollapsed: true,
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      label: 'Featured collection items',
      name: 'collectionItems',
      type: 'array',
      maxRows: 6,
      minRows: 4,
      admin: {
        initCollapsed: true,
        description: 'The featured collections to display in the header.',
        components: {
          RowLabel: '@/Header/RowLabel#CollectionRowLabel',
        },
      },
      fields: [
        {
          type: 'row',
          admin: {
            width: '100%',
          },
          fields: [
            {
              name: 'label',
              type: 'text',
              label: 'Label',
              required: true,
              admin: {
                // description: 'The label to display for the featured collection.',
                width: '40%',
              },
            },
            collectionSelectField({
              width: '60%',
              required: true,
              overrides: {
                type: 'select',
                name: 'collection',
                label: 'Collection',
              },
            }),
          ],
        }
      ],
    },    
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
