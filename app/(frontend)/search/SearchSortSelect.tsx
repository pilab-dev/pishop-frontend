'use client'

import { useRouter } from 'next/navigation'

const SORT_OPTIONS = [
  { value: 'RELEVANCE', label: 'Relevance' },
  { value: 'PRICE_LOW_TO_HIGH', label: 'Price: Low to High' },
  { value: 'PRICE_HIGH_TO_LOW', label: 'Price: High to Low' },
  { value: 'NEWEST', label: 'Newest' },
]

export const SearchSortSelect = ({
  sort,
  paramsWithoutSort,
}: {
  sort: string
  paramsWithoutSort: string
}) => {
  const router = useRouter()

  return (
    <select
      defaultValue={sort}
      onChange={(e) => {
        const params = new URLSearchParams(paramsWithoutSort)
        params.set('sort', e.target.value)
        router.push(`/search?${params.toString()}`)
      }}
      className="rounded border border-gray-300 px-3 py-2 text-sm"
    >
      {SORT_OPTIONS.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  )
}
