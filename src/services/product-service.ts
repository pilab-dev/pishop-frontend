import { client, Product } from '@/lib/client'

export const fetchProductsBySlugs = async (productSlugs: string[]): Promise<Product[]> => {
  const promises = productSlugs.map((productSlug) => client.getProduct(productSlug))
  const products = await Promise.all(promises)
  console.log('Fetching product data for: ', productSlugs)
  return products.filter(Boolean) as Product[]
}

export const getProductSubtitle = (product: Product): string => {
  return product.category?.name || product.collections?.[0]?.name || ''
}

export const hasProductImage = (product: Product): boolean => {
  return product.images?.length > 0
}
