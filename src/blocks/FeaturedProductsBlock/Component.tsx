import React from 'react'

import { TopSalesSection } from '@/components/products/top-sales-seection'
import { FeaturedProductsProps } from '@/payload-types'

type Props = FeaturedProductsProps & {}

export const FeaturedProductsBlock: React.FC<Props> = (props) => {
  const { products, blockType } = props

  if (!products || products.length === 0) {
    return (
      <TopSalesSection
        products={[
          {
            id: '3',
            tileType: 'default',
            product: {
              id: '1',
              name: 'Product 1',
              description: 'Product 1 description',
              basePrice: {
                amount: 100,
                currencyCode: 'HUF',
              },
              images: [{ id: '1', url: '/images/product1.jpg', altText: 'Product 1' }],
              tags: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              slug: 'product-1',
              isActive: true,
              sku: '1234567890',
            },
          },
          {
            id: '2',
            product: {
              id: '1',
              name: 'Product 1',
              description: 'Product 1 description',
              basePrice: {
                amount: 100,
                currencyCode: 'HUF',
              },
              images: [{ id: '1', url: '/images/product1.jpg', altText: 'Product 1' }],
              tags: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              slug: 'product-1',
              isActive: true,
              sku: '1234567890',
            },
          },
          {
            id: '2',
            product: {
              id: '1',
              name: 'Product 1',
              description: 'Product 1 description',
              basePrice: {
                amount: 100,
                currencyCode: 'HUF',
              },
              images: [{ id: '1', url: '/images/product1.jpg', altText: 'Product 1' }],
              tags: [],
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              slug: 'product-1',
              isActive: true,
              sku: '1234567890',
            },
          },
        ]}
      />
    )
  }

  return <TopSalesSection products={products} />
}
