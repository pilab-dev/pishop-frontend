'use client'

import { TabsContent as Tab, Tabs } from '@ui/tabs'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { FancyTitle } from '../fancy-title'
import { Product } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'
import Image from 'next/image'
import ProductButtons from './product-buttons'
import Link from 'next/link'

type BestSellersSectionProps = {
  title?: string
  categories?: string[]
  featuredProduct?: Product
  products?: Product[]
  className?: string
}

export const BestSellersSection: FC<PropsWithChildren<BestSellersSectionProps>> = ({
  title = 'Popular Product',
  categories = ['Top20', 'Headphones', 'Laptop & PC', 'Smartphone', 'Watch'],
  featuredProduct,
  products = [],
  className,
  children,
}) => {
  const [selectedKey, setSelectedKey] = useState('top20')

  useEffect(() => {
    console.log('selectedKey->', selectedKey)
  }, [selectedKey])

  return (
    <div className="py-20 bg-gray-50 border-t border-gray-200">
      <div className="max-w-[1280px] mx-auto px-5">
        
        {/* Header with Title and Tabs */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-10 border-b-2 border-gray-200 pb-4">
          <div className="mb-4 md:mb-0">
             <h3 className="text-3xl font-bold uppercase text-gray-800 tracking-wider">
               <span className="text-primary text-4xl">{title.charAt(0)}</span>{title.slice(1)}
             </h3>
          </div>

          <div>
            <Tabs
              aria-label="Tabs variants"
              color="primary"
              defaultValue={selectedKey}
            >
              {categories.map((tab) => (
                <Tab
                  key={tab}
                  className="uppercase text-sm font-bold tracking-wider"
                  title={tab}
                  value={tab.toLowerCase().replace(/\s+/g, '')}
                />
              ))}
            </Tabs>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product, index) => (
            <div key={product.id || index} className="group border border-gray-200 bg-white hover:border-primary transition-colors p-6 relative flex flex-col justify-between">
              
              <Link href={`/product/${product.slug}`} className="relative h-[220px] w-full block mb-4">
                <Image 
                  src={product.images[0]?.url || '/images/headphone.webp'} 
                  alt={product.name} 
                  fill 
                  className="object-contain group-hover:scale-105 transition-transform duration-500" 
                />
              </Link>
              
              <div className="text-center mt-2 flex flex-col gap-2">
                <p className="text-xs text-gray-400 uppercase font-semibold mb-1">{product.tags[0] || 'Product'}</p>
                <Link href={`/product/${product.slug}`} className="text-base text-gray-800 font-bold mb-1 block hover:text-primary transition-colors line-clamp-1">
                  {product.name}
                </Link>
                <p className="text-primary font-bold uppercase text-sm">
                  Price: {formatCurrency(product.basePrice.amount, product.basePrice.currencyCode)}
                </p>
                {product.shortDescription && (
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {product.shortDescription}
                  </p>
                )}
              </div>
              
              {/* ProductButtons - Overriding standard hover layout */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 w-full flex justify-center">
                <ProductButtons hideDetails show handle={product.slug} />
              </div>
            </div>
          ))}

          {/* Fill empty slots if needed */}
          {products.length === 0 && Array.from({ length: 4 }).map((_, index) => (
             <div key={`empty-${index}`} className="border border-gray-200 bg-white p-6 h-[350px] flex items-center justify-center">
                <p className="text-gray-400 text-sm">Loading products...</p>
             </div>
          ))}
        </div>
      </div>
    </div>
  )
}
