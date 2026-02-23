import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { BreadcrumbBar } from '@/components/products/breadcrumb-bar'
import { ProductListLayout } from '@/components/products/product-list-layout'
import React, { cache } from 'react'

import type { Category } from '@/lib/client'
import { client } from '@/lib/client'

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic'

const getCategoryBySlug = cache(
  async (
    slug: string,
    page: number = 1,
    perPage: number = 40,
  ): Promise<{ category: Category | null; products: any[]; total: number }> => {
    const category = await client.getCategory(slug)

    if (!category) {
      return {
        category: null,
        products: [],
        total: 0,
      }
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
    }
  },
)

/**
 * Generate metadata for the category page
 */
export async function generateMetadata(props: {
  params: Promise<{ slug: string[] }>
}): Promise<Metadata> {
  const params = await props.params
  const slugArray = params.slug as string[]
  const categorySlug = slugArray[slugArray.length - 1]

  const { category } = await getCategoryBySlug(categorySlug)

  if (!category) {
    return {
      title: 'Category Not Found',
      description: `The category "${categorySlug}" was not found`,
    }
  }

  return {
    title: category.name,
    description: category.description || category.name,
    openGraph: {
      title: category.name,
      description: category.description || `${category.name} products`,
    },
    twitter: {
      title: category.name,
      description: category.description || `${category.name} products`,
    },
    alternates: {
      canonical: `/category/${slugArray.join('/')}`,
    },
  }
}

type CategoryPageProps = {
  params: Promise<{
    slug: string[]
  }>
  searchParams?: Promise<{
    page?: string
    perPage?: string
    sort?: string
    view?: string
  }>
}

const CategoryPageContent: React.FC<CategoryPageProps> = async ({ params, searchParams }) => {
  const { slug: slugArray } = await params
  const searchParamsResolved = await searchParams
  const page = Number(searchParamsResolved?.page) || 1
  const perPage = Number(searchParamsResolved?.perPage) || 40

  // Get the last slug in the array (the actual category slug)
  const categorySlug = slugArray[slugArray.length - 1]

  const { category, products, total } = await getCategoryBySlug(categorySlug, page, perPage)

  // Handle category not found
  if (!category) {
    notFound()
  }

  const totalPages = Math.ceil(total / perPage)

  // Build breadcrumb segments from slug path
  const breadcrumbSegments: Array<{ name: string; href: string }> = [
    {
      name: 'Home',
      href: '/',
    },
  ]

  // Build breadcrumbs from slug path
  // If we have multiple slugs, build parent path
  if (slugArray.length > 1) {
    // Build parent path segments
    for (let i = 0; i < slugArray.length - 1; i++) {
      const parentSlug = slugArray[i]
      const parentPath = slugArray.slice(0, i + 1).join('/')
      // Use slug as name (could be improved by fetching parent categories)
      breadcrumbSegments.push({
        name: parentSlug.charAt(0).toUpperCase() + parentSlug.slice(1).replace(/-/g, ' '),
        href: `/category/${parentPath}`,
      })
    }
  } else if (category.parent) {
    // If single slug but has parent, add parent
    breadcrumbSegments.push({
      name: category.parent.name,
      href: `/category/${category.parent.slug}`,
    })
  }

  // Add current category
  breadcrumbSegments.push({
    name: category.name,
    href: `/category/${slugArray.join('/')}`,
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
        categoryName={category.name}
        filters={filters}
        currentPage={page}
        totalPages={totalPages}
        itemsPerPage={perPage}
      />
    </>
  )
}

export default function CategoryPage(props: CategoryPageProps) {
  return <CategoryPageContent {...props} />
}
