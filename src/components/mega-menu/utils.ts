import type { CategoryTreeNode } from '@/lib/client/types'

/**
 * Groups categories into columns for mega-menu layout
 * @param categories - Array of category tree nodes
 * @param maxColumns - Maximum number of columns (default: 4)
 * @returns Array of category arrays, each representing a column
 */
export const groupCategoriesIntoColumns = (
  categories: CategoryTreeNode[],
  maxColumns = 4,
): CategoryTreeNode[][] => {
  const columns: CategoryTreeNode[][] = []
  const itemsPerColumn = Math.ceil(categories.length / maxColumns)

  for (let i = 0; i < categories.length; i += itemsPerColumn) {
    columns.push(categories.slice(i, i + itemsPerColumn))
  }

  return columns
}

