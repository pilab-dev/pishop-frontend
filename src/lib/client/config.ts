import type { PaginationInput, ProductFilterInput } from './types'

/**
 * Configuration options for PiShopClient
 */
export interface PiShopClientConfig {
  /**
   * GraphQL API endpoint URL
   */
  apiUrl: string

  /**
   * Optional session ID. If not provided, one will be generated and stored.
   */
  sessionId?: string

  /**
   * Optional cart ID. If not provided, one will be created when needed.
   */
  cartId?: string

  /**
   * Optional storage adapter for persisting session and cart IDs
   * Defaults to localStorage in browser environments
   */
  storage?: Storage
}

// Re-export types for convenience
export type { PaginationInput, ProductFilterInput }

