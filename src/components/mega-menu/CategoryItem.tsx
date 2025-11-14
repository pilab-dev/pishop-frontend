import Link from 'next/link'
import type { CategoryTreeNode } from '@/lib/client/types'

interface CategoryItemProps {
  categoryNode: CategoryTreeNode
}

export const CategoryItem = ({ categoryNode }: CategoryItemProps) => {
  const { category: childCategory, children: grandChildren } = categoryNode

  return (
    <div className="space-y-2">
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
}

