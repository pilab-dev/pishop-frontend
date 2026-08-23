export { default as client } from './PiShopClient'
export type { PiShopClientConfig, PaginationInput, ProductFilterInput } from './config'
// `export *` (not `export type *`) so enums like ProductSortBy/SortOrder
// remain usable as runtime values, not just types.
export * from './types'
