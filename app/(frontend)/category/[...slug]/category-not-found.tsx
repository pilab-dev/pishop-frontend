'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useParams } from 'next/navigation'

export function CategoryNotFound() {
  const params = useParams()
  const slugArray = (params?.slug as string[]) || []
  const categorySlug = slugArray[slugArray.length - 1] || 'unknown'

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-16">
      <div className="flex min-h-96 flex-col items-center justify-center">
        <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
          <h1 className="mb-5 text-center text-6xl font-bold">⚠️</h1>

          <h2 className="mb-4 text-center text-2xl font-bold">Category Not Found</h2>
          <p className="mb-6 text-center text-gray-600">
            The category <span className="font-semibold">&quot;{categorySlug}&quot;</span> does not
            exist or has been removed.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild variant="default">
              <Link href="/">Go to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/categories">Browse Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
