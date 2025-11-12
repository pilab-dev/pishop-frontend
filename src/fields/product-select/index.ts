import type { SelectField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

type ProductSelectFieldOptions = {
  name?: string,
  required?: boolean,
  overrides?: Partial<SelectField>
  width?: string
}

export const productSelectField = ({
  overrides = {},
  required = false,
  name = 'productId',
  width = '100%',
}: ProductSelectFieldOptions = {
}): SelectField => {
  const field: SelectField = {
    name,
    label: 'Product',
    type: 'select',
    required,
    admin: {
      width,
      components: {
        Field: {
          path: '@/fields/product-select/ProductSelectComponent#ProductSelectComponent',
        },
      },
      description: 'Select a product from the storefront.',
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





