import { Metadata } from 'next'
import { notFound } from 'next/navigation'

// import NotFoundPage from "@/app/not-found";
import { FancyTitle } from '@/components/fancy-title'
import { BreadcrumbBar } from '@/components/products/breadcrumb-bar'
import { ProductGrid } from '@/components/products/product-grid'
import { SectionDecor } from '@/components/ui/section-decor'
import { ErrorBoundary } from 'next/dist/client/components/error-boundary'
import React, { cache } from 'react'
import NotFoundPage from '../../not-found'

import type { Collection } from '@/lib/client'
import { client } from '@/lib/client'

// Force dynamic rendering to avoid build-time API calls
export const dynamic = 'force-dynamic'

const getCollectionBySlug = cache(
  async (slug: string): Promise<{ collection: Collection; products: any[] }> => {
    const collection = await client.getCollection(slug)

    if (!collection) {
      notFound()
    }

    return {
      collection,
      products: collection.products || [],
    }
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
}

const CollectionPageContent: React.FC<CollectionPageProps> = async ({ params }) => {
  const { slug } = await params

  const { collection, products } = await getCollectionBySlug(slug)

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

      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="max-w-[1280px]">
          <section className="max-w-[1280px] mx-auto px-5 py-5">
            <h2 className="flex items-center uppercase text-3xl font-bold">
              <SectionDecor />
              <FancyTitle>{collection.name}</FancyTitle>
            </h2>
          </section>

          <ProductGrid products={products} variant="primary" />
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
