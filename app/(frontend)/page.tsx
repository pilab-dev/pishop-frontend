import { RenderBlocks } from '@/blocks/RenderBlocks'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import type { Page } from '@/payload-types'
import config from '@payload-config'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { cache, Suspense } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const payload = await getPayload({ config })

const getPageBySlug = cache(async (slug: string): Promise<Page | null> => {
  const page = await payload.find({
    collection: 'pages',
    where: { slug: { equals: slug } },
    limit: 1,
  })

  return page.docs[0] || null
})

export const generateMetadata = async (): Promise<Metadata> => {
  const doc = await getPageBySlug('home')

  if (!doc) {
    return {
      title: 'Home',
      description: 'Home page',
    }
  }

  return {
    title: doc.meta?.title || 'Home',
    description: doc.meta?.description || '',
  }
}

export default async function Home() {
  const page = await getPageBySlug('home')

  if (!page) {
    // Fallback if home page is not created in CMS yet
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] py-20 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Homepage Setup Required</h1>
        <p className="text-gray-600 mb-8 max-w-lg text-center">
          The homepage is now driven by the CMS. Please log in to the admin panel and create a new Page with the slug "home" to configure this view.
        </p>
      </div>
    )
  }

  return (
    <>
      <LivePreviewListener />
      <RenderBlocks blocks={page.elements} />
    </>
  )
}
