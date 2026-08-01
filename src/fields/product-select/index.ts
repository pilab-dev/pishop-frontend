import type { TextField } from 'payload'

import deepMerge from '@/utilities/deepMerge'

type ProductSelectFieldOptions = {
  name?: string,
  required?: boolean,
  overrides?: Partial<TextField>
  width?: string
}

export const productSelectField = ({
  overrides = {},
  required = false,
  name = 'productId',
  width = '100%',
}: ProductSelectFieldOptions = {
}): TextField => {
  // Stored as a plain text field (the product ID) because the allowed values
  // come from pi-shop-api's product catalog, not a fixed set known at schema
  // build time. Using Payload's `select` type here would bake an empty enum
  // into the MongoDB schema (Mongoose validates `select` fields against the
  // `options` present when the schema was built) and reject every real
  // product ID. The admin UI still renders a proper dropdown via the custom
  // Field component below, which fetches live options from GraphQL.
  const field: TextField = {
    name,
    label: 'Product',
    type: 'text',
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
  }

  return deepMerge(field, overrides)
}







