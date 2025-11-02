import type { SelectField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

type CollectionSelectFieldOptions = {
  name?: string,
  required?: boolean,
  overrides?: Partial<SelectField>
  width?: string
}

export const collectionSelectField = ({
  overrides = {},
  required = false,
  name = 'collection',
  width = '100%',
}: CollectionSelectFieldOptions = {
}): SelectField => {
  const field: SelectField = {
    name,
    label: 'Collection',
    type: 'select',
    required,
    admin: {
      width,
      components: {
        Field: {
          path: '@/fields/collection-select/CollectionSelectComponent#CollectionSelectComponent',
        },
      },
      description: 'Select a collection from the storefront.',
    },
    // Options are dynamically populated from GraphQL in the custom Field component
    // This empty array satisfies the type requirement
    options: [],
    // Custom validation to allow any string value since options are fetched dynamically
    // The actual validation happens in the custom Field component
    validate: (value) => {
      if (value && typeof value === 'string' && value.length > 0) {
        return true
      }
      return true // Allow empty values if field is not required
    },
  }

  return deepMerge(field, overrides)
}

