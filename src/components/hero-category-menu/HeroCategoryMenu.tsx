'use client'

import type { Product } from '@/lib/client'
import type { CategoryTreeNode } from '@/lib/client/types'
import { groupCategoriesIntoColumns } from '@/components/mega-menu'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { FeaturedProductCard } from './FeaturedProductCard'
import { getCategoryIcon } from './categoryIcon'

export interface HeroCategoryMenuItem {
  node: CategoryTreeNode
  featuredProduct: Product | null
}

interface HeroCategoryMenuProps {
  items: HeroCategoryMenuItem[]
}

/**
 * Vertical "shop by category" rail with a flyout panel, floated over the
 * hero banner — the sidebar seen in the reference design's home mockups.
 * Categories, subcategories, and the featured product per category all
 * come from the live GraphQL catalog (see hero-section.tsx), not from
 * hardcoded content.
 */
export function HeroCategoryMenu({ items }: HeroCategoryMenuProps) {
  const [activeId, setActiveId] = useState<string | null>(items[0]?.node.category.id ?? null)
  const [open, setOpen] = useState(false)

  if (items.length === 0) return null

  const activeItem = items.find((item) => item.node.category.id === activeId) ?? items[0]
  const columns = groupCategoriesIntoColumns(activeItem.node.children, 2)

  return (
    <div
      className="hidden lg:block absolute top-8 left-5 xl:left-12 z-20"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Shop by category"
        className="w-14 h-14 flex items-center justify-center bg-primary text-black mb-1 hover:bg-primary/90 transition-colors"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="flex">
        <div className="flex flex-col bg-[#1e1e1e]/95 backdrop-blur-sm">
          {items.map(({ node }) => {
            const Icon = getCategoryIcon(node.category.name)
            const isActive = node.category.id === activeItem.node.category.id
            return (
              <button
                key={node.category.id}
                type="button"
                onMouseEnter={() => setActiveId(node.category.id)}
                aria-current={isActive}
                className={`w-14 h-14 flex items-center justify-center border-b border-white/10 transition-colors ${
                  isActive ? 'bg-primary text-black' : 'text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            )
          })}
        </div>

        {open && (
          <div className="flex bg-white shadow-xl min-w-[420px]">
            <div className="grid grid-cols-2 gap-6 p-6 flex-1">
              {columns.length === 0 ? (
                <Link
                  href={`/collections/${activeItem.node.category.slug}`}
                  className="text-sm font-semibold uppercase text-gray-900 hover:text-primary"
                >
                  Shop {activeItem.node.category.name}
                </Link>
              ) : (
                columns.map((column, columnIndex) => (
                  <div key={columnIndex} className="space-y-2">
                    {column.map((childNode) => (
                      <Link
                        key={childNode.category.id}
                        href={`/collections/${childNode.category.slug}`}
                        className="block text-sm text-gray-700 hover:text-primary transition-colors"
                      >
                        {childNode.category.name}
                      </Link>
                    ))}
                  </div>
                ))
              )}
            </div>

            {activeItem.featuredProduct && (
              <div className="w-56 p-3 flex items-center border-l border-gray-100">
                <FeaturedProductCard product={activeItem.featuredProduct} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
