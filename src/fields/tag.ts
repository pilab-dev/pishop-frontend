import type { ArrayField, Field } from 'payload'

import deepMerge from '@/utilities/deepMerge'

type TagFieldOptions = {
  overrides?: Partial<ArrayField>
}

export const tagField = ({ overrides = {} }: TagFieldOptions = {}): Field[] => {
  const field: ArrayField = {
    name: 'tags',
    label: 'Tags',
    type: 'array',
    admin: {
      components: {
        Field: {
          path: '@/fields/tags/TagsComponent#TagsComponent',
        },
      },
      description: 'Add and manage tags for this document.',
    },
    fields: [
      {
        name: 'tag',
        type: 'text',
        required: true,
      },
    ],
  }

  return [deepMerge(field, overrides)]
}
