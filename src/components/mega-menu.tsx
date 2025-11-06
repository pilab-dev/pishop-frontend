'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import type { CategoryTreeNode } from '@/lib/client/types'
import Link from 'next/link'

interface MegaMenuProps {
  categoryTree: CategoryTreeNode[]
}

export const MegaMenu = ({ categoryTree }: MegaMenuProps) => {
  // Group categories into columns (max 4 columns for good UX)
  const groupCategoriesIntoColumns = (categories: CategoryTreeNode[], maxColumns = 4) => {
    const columns: CategoryTreeNode[][] = []
    const itemsPerColumn = Math.ceil(categories.length / maxColumns)

    for (let i = 0; i < categories.length; i += itemsPerColumn) {
      columns.push(categories.slice(i, i + itemsPerColumn))
    }

    return columns
  }

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {categoryTree.map((categoryNode) => {
          const { category, children, productCount } = categoryNode

          // If no children, just show as a link
          if (!children || children.length === 0) {
            return (
              <NavigationMenuItem key={category.id}>
                <Link
                  href={`/collections/${category.slug}`}
                  className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none"
                >
                  {category.name}
                </Link>
              </NavigationMenuItem>
            )
          }

          // Group children into columns for the mega-menu
          const columns = groupCategoriesIntoColumns(children)

          return (
            <NavigationMenuItem key={category.id}>
              <NavigationMenuTrigger>{category.name}</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[800px] gap-3 p-4 md:w-[1000px] md:grid-cols-4 lg:w-[1200px]">
                  {columns.map((column, columnIndex) => (
                    <div key={columnIndex} className="row-span-3">
                      <div className="space-y-3">
                        {column.map((childNode) => {
                          const { category: childCategory, children: grandChildren } = childNode

                          return (
                            <div key={childCategory.id} className="space-y-2">
                              {/* Level 2 Category Header */}
                              <h4 className="text-sm font-medium leading-none">
                                <Link
                                  href={`/collections/${childCategory.slug}`}
                                  className="hover:text-primary transition-colors"
                                >
                                  {childCategory.name}
                                </Link>
                              </h4>

                              {/* Level 3 Categories */}
                              {grandChildren && grandChildren.length > 0 && (
                                <ul className="space-y-1">
                                  {grandChildren.slice(0, 8).map((grandChildNode) => {
                                    const { category: grandChildCategory } = grandChildNode
                                    return (
                                      <li key={grandChildCategory.id}>
                                        <Link
                                          href={`/collections/${grandChildCategory.slug}`}
                                          className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-0.5"
                                        >
                                          {grandChildCategory.name}
                                        </Link>
                                      </li>
                                    )
                                  })}
                                  {grandChildren.length > 8 && (
                                    <li>
                                      <Link
                                        href={`/collections/${childCategory.slug}`}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors block py-0.5 font-medium"
                                      >
                                        View all ({grandChildren.length})
                                      </Link>
                                    </li>
                                  )}
                                </ul>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}

                  {/* Featured section or additional info */}
                  <div className="col-span-1 row-span-3">
                    <div className="space-y-3">
                      <h4 className="text-sm font-medium leading-none">
                        Popular in {category.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Discover our most popular {category.name.toLowerCase()} with {productCount}{' '}
                        products available.
                      </p>
                      <Link
                        href={`/collections/${category.slug}`}
                        className="text-sm text-primary hover:underline font-medium"
                      >
                        Shop all {category.name} →
                      </Link>
                    </div>
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
