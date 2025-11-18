import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BreadcrumbBar } from '@/components/products/breadcrumb-bar'
import { ProductListLayout } from '@/components/products/product-list-layout'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import React, { cache } from 'react'
import NotFoundPage from '../../not-found'

import type { Category, Collection } from '@/lib/client'
import { client } from '@/lib/client'

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic'

const getCollectionOrCategoryBySlug = cache(
  async (
    slug: string,
    page: number = 1,
    perPage: number = 40,
  ): Promise<{
    collection?: Collection
    category?: Category
    products: any[]
    total: number
    name: string
  }> => {
    // Try collection first
    let collection = await client.getCollection(slug)

    if (collection) {
      const allProducts = collection.products || []
      const total = allProducts.length
      const startIndex = (page - 1) * perPage
      const endIndex = startIndex + perPage
      const paginatedProducts = allProducts.slice(startIndex, endIndex)

      return {
        collection,
        products: paginatedProducts,
        total,
        name: collection.name,
      }
    }

    // Try category if collection not found
    const category = await client.getCategory(slug)

    if (!category) {
      notFound()
    }

    const allProducts = category.products || []
    const total = allProducts.length
    const startIndex = (page - 1) * perPage
    const endIndex = startIndex + perPage
    const paginatedProducts = allProducts.slice(startIndex, endIndex)

    return {
      category,
      products: paginatedProducts,
      total,
      name: category.name,
    }
  },
)

/**
 * Generate metadata for the collection or category page
 */
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const slug = params.slug as string

  const { collection, category, name } = await getCollectionOrCategoryBySlug(slug)

  if (!collection && !category) return notFound()

  const description = collection?.description || category?.description || name

  return {
    title: name,
    description: description || name,
    openGraph: {
      title: name,
      description: description || `${name} products`,
    },
    twitter: {
      title: name,
      description: description || `${name} products`,
    },
    alternates: {
      canonical: `/collections/${slug}`,
    },
  }
}

type CollectionPageProps = {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{
    page?: string
    perPage?: string
    sort?: string
    view?: string
  }>
}

const CollectionPageContent: React.FC<CollectionPageProps> = async ({ params, searchParams }) => {
  const { slug } = await params
  const searchParamsResolved = await searchParams
  const page = Number(searchParamsResolved?.page) || 1
  const perPage = Number(searchParamsResolved?.perPage) || 40

  const { collection, category, products, total, name } = await getCollectionOrCategoryBySlug(
    slug,
    page,
    perPage,
  )
  const totalPages = Math.ceil(total / perPage)

  // Build breadcrumb segments
  const breadcrumbSegments: Array<{ name: string; href: string }> = [{ name: 'Home', href: '/' }]

  if (category?.parent) {
    breadcrumbSegments.push({
      name: category.parent.name,
      href: `/collections/${category.parent.slug}`,
    })
  }

  breadcrumbSegments.push({
    name: name,
    href: `/collections/${slug}`,
  })

  // Mock filter data - in a real app, this would come from the API
  const filters = {
    warehouse: [
      { label: 'CHINA', value: 'china', count: 112 },
      { label: 'US-NYC', value: 'us-nyc', count: 130 },
      { label: 'EU', value: 'eu', count: 80 },
      { label: 'HK', value: 'hk', count: 50 },
      { label: 'US-LA', value: 'us-la', count: 72 },
    ],
    onSale: [
      { label: 'ON SALE', value: 'on-sale', count: 20 },
      { label: 'PRESALE', value: 'presale', count: 12 },
    ],
    priceRange: {
      min: 200,
      max: 800,
    },
    compatibleOS: [
      { label: 'Android', value: 'android', count: 280 },
      { label: 'IOS', value: 'ios', count: 162 },
    ],
    chipType: [
      { label: 'MTK2502', value: 'mtk2502', count: 112 },
      { label: 'MTK 2501', value: 'mtk2501', count: 130 },
      { label: 'MT6260', value: 'mt6260', count: 80 },
      { label: 'MTK6261', value: 'mtk6261', count: 50 },
      { label: 'MTK6571', value: 'mtk6571', count: 72 },
    ],
    function: [
      { label: 'Heart rate monitor', value: 'heart-rate', count: 112 },
      { label: 'Sleep monitor', value: 'sleep', count: 130 },
      { label: 'Pedometer', value: 'pedometer', count: 80 },
      { label: 'Alarm', value: 'alarm', count: 50 },
      { label: 'Phone call reminder', value: 'phone-call', count: 72 },
    ],
    brand: [
      { label: 'HUAWEI', value: 'huawei', count: 112 },
      { label: 'Xiaomi', value: 'xiaomi', count: 130 },
      { label: 'ZGPAX', value: 'zgpax', count: 80 },
      { label: 'Atongm', value: 'atongm', count: 50 },
      { label: 'MIFONE', value: 'mifone', count: 72 },
    ],
    colors: [
      { label: 'Red', value: 'red', color: '#ef4444' },
      { label: 'Green', value: 'green', color: '#22c55e' },
      { label: 'Blue', value: 'blue', color: '#3b82f6' },
      { label: 'Brown', value: 'brown', color: '#a16207' },
      { label: 'Orange', value: 'orange', color: '#f97316' },
      { label: 'Yellow', value: 'yellow', color: '#eab308' },
      { label: 'Black', value: 'black', color: '#000000' },
      { label: 'White', value: 'white', color: '#ffffff' },
      { label: 'Grey', value: 'grey', color: '#6b7280' },
      { label: 'Light Blue', value: 'light-blue', color: '#60a5fa' },
      { label: 'Pink', value: 'pink', color: '#ec4899' },
      { label: 'Dark Red', value: 'dark-red', color: '#991b1b' },
    ],
    discount: [
      { label: '10%', value: '10' },
      { label: '20%', value: '20' },
      { label: '30%', value: '30' },
      { label: '50%', value: '50' },
    ],
  }

  return (
    <>
      <BreadcrumbBar segments={breadcrumbSegments} />

      <ProductListLayout
        products={products}
        totalProducts={total}
        categoryName={name}
        filters={filters}
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={perPage}
      />
    </>
  )
}

export default function CollectionPage(props: CollectionPageProps) {
  return (
    <ErrorBoundary errorComponent={NotFoundPage}>
      <CollectionPageContent {...props} />
    </ErrorBoundary>
  )
}
