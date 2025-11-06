import { client, Product } from '@/lib/client'

/**
 * Get featured/best seller products by category
 * Note: Collections functionality removed - returns empty array
 */
export async function getBestSellerProducts(category?: string, limit: number = 5): Promise<Product[]> {
  // Collections no longer exist, return empty array
  return []
}

/**
 * Get featured products for specific categories
 * Note: Collections functionality removed - returns empty object
 */
export async function getFeaturedProductsForCategories(categoryIds: string[]): Promise<Record<string, Product[]>> {
  // Collections no longer exist, return empty object
  return {}
}

/**
 * Get a featured product for display
 */
export async function getFeaturedProduct(): Promise<Product | null> {
  try {
    const products = await getBestSellerProducts(undefined, 1)
    return products[0] || null
  } catch (error) {
    console.error('Error fetching featured product:', error)
    return null
  }
}