'use client'

import { TabsContent as Tab, Tabs } from '@ui/tabs'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { FancyTitle } from '../fancy-title'
import { SectionDecor } from '../ui/section-decor'

import { Product } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'
import Image from 'next/image'
import ProductButtons from './product-buttons'

type BestSellersSectionProps = {
  title?: string
  categories?: string[]
  featuredProduct?: Product
  products?: Product[]
  className?: string
}

export const BestSellersSection: FC<PropsWithChildren<BestSellersSectionProps>> = ({
  title = 'Best Sellers',
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
    <div className="bg-gray-100 pt-14 pb-5">
      <div className="max-w-[1280px] mx-auto px-5 py-5">
        <div className="flex flex-row justify-between gap-4 py-8 md:py-10">
          <h2 className="flex items-center uppercase text-4xl font-bold">
            <SectionDecor />
            <FancyTitle label={title} />
          </h2>

          <Tabs
            aria-label="Tabs variants"
            color="primary"
            defaultValue={selectedKey}
            // variant="underlined"
            // onSelectionChange={(e) => setSelectedKey(e as string)}
          >
            {categories.map((tab) => (
              <Tab
                key={tab}
                className="products-tab"
                title={tab}
                value={tab.toLowerCase().replace(/\s+/g, '')}
              />
            ))}
          </Tabs>
        </div>

        <div className="grid grid-cols-4" style={{ gap: '2px' }}>
          {/* Featured item */}
          {featuredProduct && (
            <div
              className="p-6 scaled-product-tile
                col-span-2 row-span-2 bg-white
                transition-all ease-in-out
                "
            >
              <div className="flex flex-col gap-1 justify-center content-center h-full">
                <p className="text-blue-800 text-sm font-normal mb-1 text-center">
                  {featuredProduct.tags[0] || 'Product'}
                </p>
                <h3 className="text-lg text-gray-600 font-bold mb-1 text-center products-font">
                  {featuredProduct.name}
                </h3>
                <p className="text-gray-600 text-center products-font uppercase">
                  PRICE:{' '}
                  <span className="font-bold text-primary">
                    {formatCurrency(
                      featuredProduct.basePrice.amount,
                      featuredProduct.basePrice.currencyCode,
                    )}
                  </span>
                </p>

                <div className="mx-auto p-16 flex-1 max-h-[570px]">
                  <Image
                    alt={featuredProduct.name}
                    className="h-full object-contain"
                    src={featuredProduct.images[0]?.url || '/images/placeholder.webp'}
                    title={featuredProduct.name}
                    width={400}
                    height={570}
                  />
                </div>

                <div className="mx-auto">
                  <ProductButtons hideDetails show handle={featuredProduct.slug} />
                </div>
              </div>
            </div>
          )}

          {/* Grid products */}
          {products.slice(0, 4).map((product, index) => (
            <div
              key={product.id || index}
              className="p-6
          bg-white transition-all
            scaled-product-tile origin-bottom hover:z-50 hover:shadow-lg
            h-[400px]"
            >
              <div className="flex flex-col gap-1 justify-left h-full">
                <p className="text-blue-800 text-sm font-normal mb-1">
                  {product.tags[0] || 'Product'}
                </p>
                <h3 className="text-base text-gray-600 font-bold mb-1 products-font">
                  {product.name}
                </h3>
                <p className="text-gray-600 products-font uppercase">
                  PRICE:{' '}
                  <span className="font-bold text-primary">
                    {formatCurrency(product.basePrice.amount, product.basePrice.currencyCode)}
                  </span>
                </p>

                <div className="mx-auto flex-1 p-8 max-h-[200px]">
                  <Image
                    alt={product.name}
                    className="h-full object-contain"
                    src={product.images[0]?.url || '/images/placeholder.webp'}
                    title={product.name}
                    width={200}
                    height={200}
                  />
                </div>

                <p className="text-gray-600 products-font">
                  {product.shortDescription ||
                    product.description?.slice(0, 60) ||
                    'Product description'}
                </p>
              </div>
            </div>
          ))}

          {/* Fill empty slots if less than 4 products */}
          {products.length < 4 &&
            Array.from({ length: 4 - products.length }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className="p-6 bg-white transition-all scaled-product-tile h-[400px] flex items-center justify-center"
              >
                <p className="text-gray-400 text-sm">More products coming soon...</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  )
}
