import Link from 'next/link'
import type { Category } from '@/payload-types'

interface FeaturedSectionProps {
  category: Category
  productCount: number
}

export const FeaturedSection = ({ category, productCount }: FeaturedSectionProps) => {
  return (
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
  )
}

