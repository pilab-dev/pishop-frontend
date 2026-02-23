'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'

export function CollectionNotFound() {
  const params = useParams()
  const slug = (params?.slug as string) || 'unknown'

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-16">
      <div className="flex min-h-96 flex-col items-center justify-center">
        <div className="mx-auto my-4 flex max-w-xl flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 dark:border-neutral-800 dark:bg-black">
          <h1 className="mb-5 text-center text-6xl font-bold">⚠️</h1>

          <h2 className="mb-4 text-center text-2xl font-bold">Collection Not Found</h2>
          <p className="mb-6 text-center text-gray-600">
            The collection <span className="font-semibold">&quot;{slug}&quot;</span> does not exist
            or has been removed.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button asChild variant="default">
              <Link href="/">Go to Home</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/collections">Browse Collections</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

