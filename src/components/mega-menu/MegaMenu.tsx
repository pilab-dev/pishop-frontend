'use client'

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import type { CategoryTreeNode } from '@/lib/client/types'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { groupCategoriesIntoColumns } from '.'
import { CategoryColumn } from './CategoryColumn'
import { FeaturedSection } from './FeaturedSection'

interface MegaMenuProps {
  categoryTree: CategoryTreeNode[]
}

export const MegaMenu = ({ categoryTree }: MegaMenuProps) => {
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
                  className={cn(
                    `group inline-flex h-14 w-max items-center justify-center bg-transparent`,
                    `px-4 py-2 text-sm font-bold uppercase transition-colors text-white hover:text-primary`,
                    `focus:bg-transparent focus:text-primary focus:outline-none`,
                  )}
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
              <NavigationMenuTrigger className="bg-transparent text-white hover:bg-transparent hover:text-primary data-[state=open]:bg-transparent data-[state=open]:text-primary data-[active]:bg-transparent focus:bg-transparent text-sm font-bold uppercase h-14">
                {category.name}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid w-[800px] gap-3 p-4 md:w-[1000px] md:grid-cols-4 lg:w-[1200px]">
                  {columns.map((column, columnIndex) => (
                    <CategoryColumn key={columnIndex} categories={column} />
                  ))}

                  {/* Featured section or additional info */}
                  <FeaturedSection category={category} productCount={productCount} />
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
