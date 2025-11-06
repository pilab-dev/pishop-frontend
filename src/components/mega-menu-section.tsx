'use client'

import React from 'react'
import { client } from '@/lib/client'
import type { CategoryTreeNode } from '@/lib/client/types'
import { MegaMenu } from './mega-menu'

export const MegaMenuSection = () => {
  // We'll fetch the category tree here instead of in the header
  const [categoryTree, setCategoryTree] = React.useState<CategoryTreeNode[]>([])

  React.useEffect(() => {
    const fetchCategoryTree = async () => {
      try {
        const tree = await client.getCategoryTree()
        setCategoryTree(tree)
      } catch (error) {
        console.error('Failed to fetch category tree:', error)
      }
    }

    fetchCategoryTree()
  }, [])

  if (categoryTree.length === 0) {
    return null // Don't render until data is loaded
  }

  return (
    <div className="hidden sm:block bg-white border-b border-gray-200">
      <div className="max-w-[1280px] mx-auto px-5 py-4">
        <MegaMenu categoryTree={categoryTree} />
      </div>
    </div>
  )
}
