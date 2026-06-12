import { Metadata } from 'next'
import { Suspense } from 'react'
import { client, Product, PaginationInput, ProductFilterInput } from '@/lib/client'
import { ProductGrid } from '@/components/products/product-grid'
import { BreadcrumbBar } from '@/components/products/breadcrumb-bar'

export const dynamic = 'force-dynamic'

interface SearchParams {
  q?: string
  category?: string
  collection?: string
  minPrice?: string
  maxPrice?: string
  inStock?: string
  tags?: string
  sort?: string
  page?: string
}

type SearchPageProps = {
  searchParams: Promise<SearchParams>
}

async function getSearchResults(
  searchParams: SearchParams,
): Promise<{ products: Product[]; total: number; page: number; totalPages: number }> {
  const page = parseInt(searchParams.page || '1', 10)
  const limit = 12

  const filter: ProductFilterInput = {}

  if (searchParams.q) {
    filter.tags = [searchParams.q]
  }
  if (searchParams.category) {
    filter.category = searchParams.category
  }
  if (searchParams.collection) {
    filter.collection = searchParams.collection
  }
  if (searchParams.minPrice) {
    filter.priceMin = parseFloat(searchParams.minPrice)
  }
  if (searchParams.maxPrice) {
    filter.priceMax = parseFloat(searchParams.maxPrice)
  }
  if (searchParams.inStock === 'true') {
    filter.inStock = true
  }

  const pagination: PaginationInput = {
    page,
    limit,
    sortBy: searchParams.sort || 'RELEVANCE',
    sortOrder: 'DESC',
  }

  try {
    const products = await client.getProducts(pagination, filter)
    return {
      products,
      total: products.length,
      page,
      totalPages: Math.ceil(products.length / limit),
    }
  } catch (error) {
    console.error('Search error:', error)
    return {
      products: [],
      total: 0,
      page: 1,
      totalPages: 0,
    }
  }
}

export async function generateMetadata(props: SearchPageProps): Promise<Metadata> {
  const searchParams = await props.searchParams
  const query = searchParams.q || ''

  return {
    title: query ? `Search: ${query}` : 'Search Products',
    description: `Search products${query ? ` for "${query}"` : ''}. Find the best deals on laptops, smartphones, headphones and more.`,
  }
}

const SearchFilters: React.FC<{
  searchParams: SearchParams
  total: number
}> = ({ searchParams, total }) => {
  const currentParams = new URLSearchParams()

  if (searchParams.q) currentParams.set('q', searchParams.q)
  if (searchParams.category) currentParams.set('category', searchParams.category)
  if (searchParams.minPrice) currentParams.set('minPrice', searchParams.minPrice)
  if (searchParams.maxPrice) currentParams.set('maxPrice', searchParams.maxPrice)
  if (searchParams.inStock === 'true') currentParams.set('inStock', 'true')

  const page = parseInt(searchParams.page || '1', 10)
  const sort = searchParams.sort || 'RELEVANCE'

  const sortOptions = [
    { value: 'RELEVANCE', label: 'Relevance' },
    { value: 'PRICE_LOW_TO_HIGH', label: 'Price: Low to High' },
    { value: 'PRICE_HIGH_TO_LOW', label: 'Price: High to Low' },
    { value: 'NEWEST', label: 'Newest' },
  ]

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-200 py-4">
      <div className="text-sm text-gray-600">
        {total} product{total !== 1 ? 's' : ''} found
        {searchParams.q && <span> for &quot;{searchParams.q}&quot;</span>}
      </div>

      <div className="flex items-center gap-4">
        <select
          defaultValue={sort}
          onChange={(e) => {
            const params = new URLSearchParams(currentParams)
            params.set('sort', e.target.value)
            window.location.href = `/search?${params.toString()}`
          }}
          className="rounded border border-gray-300 px-3 py-2 text-sm"
        >
          {sortOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

const PaginationControls: React.FC<{
  searchParams: SearchParams
  totalPages: number
}> = ({ searchParams, totalPages }) => {
  const page = parseInt(searchParams.page || '1', 10)

  if (totalPages <= 1) return null

  const buildUrl = (newPage: number) => {
    const params = new URLSearchParams()
    if (searchParams.q) params.set('q', searchParams.q)
    if (searchParams.category) params.set('category', searchParams.category)
    if (searchParams.minPrice) params.set('minPrice', searchParams.minPrice)
    if (searchParams.maxPrice) params.set('maxPrice', searchParams.maxPrice)
    if (searchParams.inStock === 'true') params.set('inStock', 'true')
    if (searchParams.sort && searchParams.sort !== 'RELEVANCE')
      params.set('sort', searchParams.sort)
    params.set('page', String(newPage))
    return `/search?${params.toString()}`
  }

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      {page > 1 && (
        <a
          href={buildUrl(page - 1)}
          className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
        >
          Previous
        </a>
      )}

      <span className="px-4 text-sm">
        Page {page} of {totalPages}
      </span>

      {page < totalPages && (
        <a
          href={buildUrl(page + 1)}
          className="rounded border border-gray-300 px-4 py-2 text-sm hover:bg-gray-100"
        >
          Next
        </a>
      )}
    </div>
  )
}

const SearchPageContent: React.FC<SearchPageProps> = async ({ searchParams }) => {
  const params = await searchParams

  const { products, total, page, totalPages } = await getSearchResults(params)

  return (
    <>
      <BreadcrumbBar
        segments={[
          { name: 'Search', href: '/search' },
          ...(params.q ? [{ name: params.q, href: `/search?q=${params.q}` }] : []),
        ]}
      />

      <div className="mx-auto max-w-[1280px] px-5 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">
            {params.q ? `Search: "${params.q}"` : 'Search Products'}
          </h1>
        </div>

        <SearchFilters searchParams={params} total={total} />

        {products.length > 0 ? (
          <>
            <ProductGrid products={products} />
            <PaginationControls searchParams={params} totalPages={totalPages} />
          </>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-600">
              No products found.
              {params.q && <span> Try a different search term.</span>}
            </p>
            <a href="/search" className="mt-4 inline-block text-primary hover:underline">
              Clear filters
            </a>
          </div>
        )}
      </div>
    </>
  )
}

export default function SearchPage(props: SearchPageProps) {
  return (
    <Suspense fallback={<div className="py-16 text-center">Loading...</div>}>
      <SearchPageContent {...props} />
    </Suspense>
  )
}
