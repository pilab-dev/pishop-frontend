import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// import NotFoundPage from "@/app/not-found";
import { FancyTitle } from '@/components/fancy-title'
import { BreadcrumbBar } from '@/components/products/breadcrumb-bar'
import { ProductGrid } from '@/components/products/product-grid'
import { CollectionSidebar } from '@/components/products/collection-sidebar'
import { CollectionToolbar } from '@/components/products/collection-toolbar'
import { SectionDecor } from '@/components/ui/section-decor'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import React, { cache } from 'react'
import NotFoundPage from '../../not-found'

import type { Collection } from '@/lib/client'
import { client } from '@/lib/client'

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic'

const SORT_OPTIONS: Record<string, { sortBy: string; sortOrder?: string }> = {
  newest: { sortBy: 'NEWEST' },
  price_high_to_low: { sortBy: 'PRICE_HIGH_TO_LOW' },
  price_low_to_high: { sortBy: 'PRICE_LOW_TO_HIGH' },
  best_selling: { sortBy: 'BEST_SELLING' },
}

const getCollectionBySlug = cache(
  async (slug: string, sort?: string): Promise<{ collection: Collection; products: any[] }> => {
    const sortOption = sort ? SORT_OPTIONS[sort] : undefined

    // The mega-menu links both actual collections and categories to
    // /collections/[slug] (categories have no dedicated route), so fall back
    // to a category lookup when the slug isn't a real collection.
    const collection = await client.getCollection(slug, sortOption)
    if (collection) {
      return {
        collection,
        products: collection.products || [],
      }
    }

    const category = await client.getCategory(slug, sortOption)
    if (category) {
      return {
        collection: category as unknown as Collection,
        products: category.products || [],
      }
    }

    notFound()
  },
)

/**
 * Generate metadata for the collection page
 */
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const params = await props.params
  const slug = params.slug as string

  const { collection } = await getCollectionBySlug(slug)

  if (!collection) return notFound()

  return {
    title: collection.name,
    description: collection.description || collection.name,
    openGraph: {
      title: collection.name,
      description: collection.description || `${collection.name} products`,
    },
    twitter: {
      title: collection.name,
      description: collection.description || `${collection.name} products`,
    },
    alternates: {
      canonical: `/collections/${collection.slug}`,
    },
  }
}

type CollectionPageProps = {
  params: Promise<{
    slug: string
  }>
  searchParams: Promise<{
    sort?: string
  }>
}

const CollectionPageContent: React.FC<CollectionPageProps> = async ({ params, searchParams }) => {
  const { slug } = await params
  const { sort } = await searchParams

  const { collection, products } = await getCollectionBySlug(slug, sort)

  return (
    <>
      <BreadcrumbBar
        segments={[
          {
            name: collection.name,
            href: `/collections/${collection.slug}`,
          },
        ]}
      />

      <div className="max-w-[1280px] mx-auto px-5 py-8 md:py-10">
        <section className="mb-8">
          <h2 className="flex items-center uppercase text-3xl font-bold">
            <SectionDecor />
            <FancyTitle label={collection.name} />
          </h2>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <CollectionSidebar />
          </div>

          {/* Main Content Area */}
          <div className="md:col-span-9">
            <CollectionToolbar activeSort={sort} />
            <ProductGrid products={products} variant="primary" />
          </div>
        </div>
      </div>
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
