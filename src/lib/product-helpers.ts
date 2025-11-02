import { client, Product } from '@/lib/client'
import config from '@/payload.config'
import { getPayload } from 'payload'
import type { Collection, Category } from '@/payload-types'

/**
 * Get featured/best seller products by category
 */
export async function getBestSellerProducts(category?: string, limit: number = 5): Promise<Product[]> {
  try {
    const payload = await getPayload({ config })

    let featuredSlugs: string[] = []

    if (category) {
      // Get featured products for specific collection
      const collectionResult = await payload.find({
        collection: 'collections',
        where: {
          slug: {
            equals: category,
          },
        },
        limit: 1,
        depth: 1,
      })

      if (collectionResult.docs.length > 0) {
        const collection = collectionResult.docs[0] as Collection
        featuredSlugs = collection.featuredProducts?.map(fp => fp.slug) || []
      }
    } else {
      // Get featured products from all collections (for general best sellers)
      const collectionsResult = await payload.find({
        collection: 'collections',
        limit: 10, // Reasonable limit for collections
        depth: 1,
      })

      // Collect all featured product slugs from all collections
      for (const collection of collectionsResult.docs as Collection[]) {
        if (collection.featuredProducts) {
          featuredSlugs.push(...collection.featuredProducts.map(fp => fp.slug))
        }
      }

      // Remove duplicates and limit
      featuredSlugs = [...new Set(featuredSlugs)].slice(0, limit)
    }

    if (featuredSlugs.length === 0) {
      return []
    }

    // Fetch products by slugs from GraphQL
    const products: Product[] = []
    for (const slug of featuredSlugs.slice(0, limit)) {
      try {
        const product = await client.getProduct(slug)
        if (product) {
          products.push(product)
        }
      } catch (error) {
        console.warn(`Failed to fetch product with slug ${slug}:`, error)
      }
    }

    return products
  } catch (error) {
    console.error('Error fetching best seller products:', error)
    return []
  }
}

/**
 * Get featured products for specific categories
 */
export async function getFeaturedProductsForCategories(categoryIds: string[]): Promise<Record<string, Product[]>> {
  try {
    const payload = await getPayload({ config })

    // Get categories by IDs to find their slugs
    const categoriesResult = await payload.find({
      collection: 'categories',
      where: {
        id: {
          in: categoryIds,
        },
      },
      limit: categoryIds.length,
      depth: 1,
    })

    const featuredProducts: Record<string, Product[]> = {}

    // For each category, try to find a corresponding collection by slug
    for (const category of categoriesResult.docs as Category[]) {
      const collectionResult = await payload.find({
        collection: 'collections',
        where: {
          slug: {
            equals: category.slug,
          },
        },
        limit: 1,
        depth: 1,
      })

      if (collectionResult.docs.length > 0) {
        const collection = collectionResult.docs[0] as Collection
        const slugs = collection.featuredProducts?.map(fp => fp.slug) || []

        if (slugs.length > 0) {
          const products: Product[] = []
          for (const slug of slugs.slice(0, 4)) { // Limit to 4 per category
            try {
              const product = await client.getProduct(slug)
              if (product) {
                products.push(product)
              }
            } catch (error) {
              console.warn(`Failed to fetch product with slug ${slug}:`, error)
            }
          }
          featuredProducts[category.id] = products
        }
      }
    }

    return featuredProducts
  } catch (error) {
    console.error('Error fetching featured products for categories:', error)
    return {}
  }
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