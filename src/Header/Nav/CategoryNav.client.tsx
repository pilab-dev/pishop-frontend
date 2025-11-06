'use client'

import { Media } from '@/components/Media'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Product, Category } from '@/lib/client/types'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

interface CategoryNavClientProps {
  categoryTree: (Category & { children: Category[] })[]
  featuredProducts: Record<string, Product[]>
  promotionalContent?: {
    id: string
    title: string
    products?: Array<{
      productId: string
      overrideTitle?: string | null
      badge?: string | null
    }>
  }
}

export const CategoryNavClient: React.FC<CategoryNavClientProps> = ({
  categoryTree,
  featuredProducts,
  promotionalContent,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div onMouseLeave={() => setIsOpen(false)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger onMouseEnter={() => setIsOpen(true)} className="flex items-center gap-1">
          Categories <ChevronDown className="w-4 h-4" />
        </PopoverTrigger>
        <PopoverContent onMouseEnter={() => setIsOpen(true)} className="w-screen max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
            {categoryTree.map((category) => (
              <div key={category.id} className="flex flex-col gap-2">
                <h3 className="font-bold text-lg mb-2 border-b pb-2">
                  <Link href={`/collections/${category.slug}`} onClick={() => setIsOpen(false)}>
                    {category.name}
                  </Link>
                </h3>
                <ul className="space-y-2">
                  {category.children?.map((child) => (
                    <li key={child.id}>
                      <Link
                        href={`/collections/${child.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="hover:underline"
                      >
                        {child.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
              {/* Display promotional content products first, then fallback to category featured products */}
              {promotionalContent?.products?.slice(0, 4).map((promoProduct) => (
                <Link
                  href={`/product/${promoProduct.productId}`}
                  key={promoProduct.productId}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="border rounded-lg p-2 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center relative">
                    {promoProduct.badge && (
                      <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs px-1.5 py-0.5 rounded">
                        {promoProduct.badge}
                      </span>
                    )}
                    <div className="w-full h-32 bg-muted rounded-md mb-2 flex items-center justify-center">
                      <span className="text-muted-foreground text-xs">Product Image</span>
                    </div>
                    <span className="text-center text-sm font-semibold">
                      {promoProduct.overrideTitle || `Product ${promoProduct.productId}`}
                    </span>
                  </div>
                </Link>
              )) ||
                Object.values(featuredProducts)
                  .flat()
                  .slice(0, 4)
                  .map((product) => (
                    <Link
                      href={`/product/${product.slug}`}
                      key={product.id}
                      onClick={() => setIsOpen(false)}
                    >
                      <div className="border rounded-lg p-2 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center">
                        {product.images[0]?.url && (
                          <Media
                            resource={product.images[0].url}
                            className="w-full h-32 object-cover rounded-md mb-2"
                          />
                        )}
                        <span className="text-center text-sm font-semibold">{product.name}</span>
                      </div>
                    </Link>
                  ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
