'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React, { useState, useEffect, useCallback } from 'react'
import { useDebounce } from '@/utilities/useDebounce'
import { useRouter, useSearchParams } from 'next/navigation'

export const Search: React.FC = () => {
  const [value, setValue] = useState('')
  const router = useRouter()
  const searchParams = useSearchParams()
  const debouncedValue = useDebounce(value)

  useEffect(() => {
    const currentQ = searchParams.get('q') || ''
    if (debouncedValue !== currentQ) {
      router.push(`/search${debouncedValue ? `?q=${encodeURIComponent(debouncedValue)}` : ''}`)
    }
  }, [debouncedValue, router, searchParams])

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          onChange={(event) => {
            setValue(event.target.value)
          }}
          defaultValue={searchParams.get('q') || ''}
          placeholder="Search products..."
        />
        <button type="submit" className="sr-only">
          submit
        </button>
      </form>
    </div>
  )
}

export const SearchWithFilters: React.FC = () => {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [category, setCategory] = useState(searchParams.get('category') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [inStock, setInStock] = useState(searchParams.get('inStock') === 'true')

  const debouncedQuery = useDebounce(query)

  const buildParams = useCallback(() => {
    const params = new URLSearchParams()
    if (debouncedQuery) params.set('q', debouncedQuery)
    if (category) params.set('category', category)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (inStock) params.set('inStock', 'true')
    return params.toString()
  }, [debouncedQuery, category, minPrice, maxPrice, inStock])

  useEffect(() => {
    const params = buildParams()
    router.push(`/search${params ? `?${params}` : ''}`)
  }, [buildParams, router])

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="search-query">Search</Label>
        <Input
          id="search-query"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products..."
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2"
        >
          <option value="">All Categories</option>
          <option value="laptop">Laptops</option>
          <option value="smartphone">Smartphones</option>
          <option value="headphone">Headphones</option>
          <option value="watch">Watches</option>
          <option value="tablet">Tablets</option>
        </select>
      </div>

      <div className="flex gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="min-price">Min Price</Label>
          <Input
            id="min-price"
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            placeholder="0"
          />
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <Label htmlFor="max-price">Max Price</Label>
          <Input
            id="max-price"
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            placeholder="999999"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="in-stock"
          type="checkbox"
          checked={inStock}
          onChange={(e) => setInStock(e.target.checked)}
        />
        <Label htmlFor="in-stock">In Stock Only</Label>
      </div>

      <button
        onClick={() => {
          setQuery('')
          setCategory('')
          setMinPrice('')
          setMaxPrice('')
          setInStock(false)
        }}
        className="text-sm text-gray-600 hover:text-primary"
      >
        Clear Filters
      </button>
    </div>
  )
}
