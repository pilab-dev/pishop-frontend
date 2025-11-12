import type { CategoryTreeNode } from '@/lib/client/types'
import { CategoryItem } from './CategoryItem'

interface CategoryColumnProps {
  categories: CategoryTreeNode[]
}

export const CategoryColumn = ({ categories }: CategoryColumnProps) => {
  return (
    <div className="row-span-3">
      <div className="space-y-3">
        {categories.map((categoryNode) => (
          <CategoryItem key={categoryNode.category.id} categoryNode={categoryNode} />
        ))}
      </div>
    </div>
  )
}
