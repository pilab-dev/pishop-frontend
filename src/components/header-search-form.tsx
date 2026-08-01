'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export const HeaderSearchForm = ({
  categories,
  inputClassName,
  selectClassName,
  buttonClassName,
}: {
  categories: { slug?: string | null; name: string }[]
  inputClassName: string
  selectClassName: string
  buttonClassName: string
}) => {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())
    if (category !== 'all') params.set('category', category)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-row flex-1">
      <select
        className={selectClassName}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All</option>
        {categories.map((c) => (
          <option key={c.slug} value={c.slug || ''}>
            {c.name}
          </option>
        ))}
      </select>
      <input
        className={inputClassName}
        placeholder="Search..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button type="submit" className={buttonClassName}>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            clipRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            fillRule="evenodd"
          />
        </svg>
      </button>
    </form>
  )
}
