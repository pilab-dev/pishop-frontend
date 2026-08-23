'use client'

import { TabsContent as Tab, Tabs } from '@ui/tabs'
import { FC, PropsWithChildren, useEffect, useState } from 'react'

import { FancyTitle } from '../fancy-title'
import { SectionDecor } from '../ui/section-decor'

import { Product } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'
import Image from 'next/image'
import ProductButtons from './product-buttons'

type BestProposesSectionProps = {
  featuredProduct?: Product
  products?: Product[]
}

export const BestProposesSection: FC<PropsWithChildren<BestProposesSectionProps>> = ({
  featuredProduct,
  products = [],
}) => {
  const [selectedKey, setSelectedKey] = useState('featured')

  return (
    <div className="bg-white pt-14 pb-5">
      <div className="max-w-[1280px] mx-auto px-5 py-5">
        <div className="flex flex-row justify-between gap-4 py-8 md:py-10 border-b border-gray-200 mb-8">
          <h2 className="flex items-center uppercase text-3xl md:text-4xl font-bold">
            <div className="w-8 h-0.5 bg-yellow-400 mr-3"></div>
            BEST PROPOSES
          </h2>

          <Tabs
            aria-label="Tabs variants"
            color="primary"
            defaultValue={selectedKey}
            className="products-tab"
          >
            <Tab title="Featured" value="featured" />
            <Tab title="One sale" value="onesale" />
            <Tab title="Top rate" value="toprate" />
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Featured item - Left side, takes 2 columns */}
          {featuredProduct && (
            <div className="md:col-span-2 bg-gray-50 rounded-lg p-8 relative overflow-hidden flex flex-col justify-center items-center group hover:shadow-lg transition-shadow">
              {/* Background circle decoration */}
              <div className="absolute top-1/2 left-1/4 transform -translate-y-1/2 w-96 h-96 bg-gray-200 rounded-full opacity-50 -z-10"></div>
              
              <div className="w-full h-[400px] flex items-center justify-center mb-6">
                <Image
                  alt={featuredProduct.name}
                  className="h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  src={featuredProduct.images[0]?.url || '/images/headphone.webp'}
                  title={featuredProduct.name}
                  width={400}
                  height={400}
                />
              </div>

              <div className="flex flex-col items-center gap-2 z-10 bg-white/80 backdrop-blur-sm p-4 rounded-xl w-3/4 text-center shadow-sm">
                <h3 className="text-xl text-gray-800 font-bold products-font">
                  {featuredProduct.name}
                </h3>
                <p className="text-gray-500 products-font text-sm uppercase">
                  PRICE:{' '}
                  <span className="font-bold text-yellow-500">
                    {formatCurrency(
                      featuredProduct.basePrice.amount,
                      featuredProduct.basePrice.currencyCode,
                    )}
                  </span>
                </p>
                <ul className="text-left text-xs text-gray-500 list-disc pl-4 mt-2 mb-4">
                  <li>Windows 10</li>
                  <li>Intel® Quad Core Processors</li>
                  <li>NVIDIA GeForce GTX 950M Graphics Card</li>
                </ul>
                <ProductButtons hideDetails show handle={featuredProduct.slug} />
              </div>
            </div>
          )}

          {/* Stacked products - Right side */}
          <div className="flex flex-col gap-6">
            {products.slice(0, 2).map((product, index) => (
              <div
                key={product.id || index}
                className="bg-white border border-gray-100 p-6 flex items-center gap-4 hover:shadow-lg transition-shadow flex-1 rounded-lg group"
              >
                <div className="w-32 h-32 flex-shrink-0 bg-gray-50 rounded-md p-2 flex items-center justify-center">
                  <Image
                    alt={product.name}
                    className="h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    src={product.images[0]?.url || '/images/headphone.webp'}
                    title={product.name}
                    width={100}
                    height={100}
                  />
                </div>
                <div className="flex flex-col justify-center">
                  <h3 className="text-sm text-gray-800 font-bold mb-1 products-font line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs products-font uppercase mb-2">
                    PRICE:{' '}
                    <span className="font-bold text-yellow-500">
                      {formatCurrency(product.basePrice.amount, product.basePrice.currencyCode)}
                    </span>
                  </p>
                  <ul className="text-left text-[10px] text-gray-400 list-disc pl-4 mb-3">
                    <li>Windows 10</li>
                    <li>Intel® Quad Core</li>
                  </ul>
                  <div className="scale-75 origin-left">
                     <ProductButtons hideDetails show handle={product.slug} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
