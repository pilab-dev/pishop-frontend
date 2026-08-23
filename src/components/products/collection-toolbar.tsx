'use client'

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const SORT_LABELS: { value: string; label: string }[] = [
  { value: 'newest', label: 'NewestArrivals' },
  { value: 'price_high_to_low', label: 'Price high to low' },
  { value: 'price_low_to_high', label: 'Price low to high' },
  { value: 'best_selling', label: 'Most populer' },
]

export const CollectionToolbar = ({ activeSort }: { activeSort?: string }) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const setSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', value)
    router.push(`${pathname}?${params.toString()}`)
  }

  const currentSort = activeSort || 'newest'

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center mb-8 py-3 border-y border-gray-200">
      <div className="flex items-center space-x-4 mb-4 lg:mb-0 w-full lg:w-auto overflow-x-auto">
        <span className="text-gray-500 text-sm font-normal whitespace-nowrap">Short by:</span>
        <div className="flex space-x-6 text-sm text-gray-500 whitespace-nowrap">
          {SORT_LABELS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className={
                currentSort === opt.value
                  ? 'text-gray-800 font-semibold transition-colors'
                  : 'hover:text-yellow-500 transition-colors'
              }
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
