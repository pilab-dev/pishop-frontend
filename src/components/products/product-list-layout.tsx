'use client'

import { Product } from '@/lib/client'
import { ProductGrid } from './product-grid'
import { FilterSidebar, type FilterSidebarProps } from './filter-sidebar'
import { ProductListToolbar } from './product-list-toolbar'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'

interface ProductListLayoutProps {
  products: Product[]
  totalProducts?: number
  categoryName?: string
  filters?: FilterSidebarProps['filters']
  currentPage?: number
  totalPages?: number
  itemsPerPage?: number
}

export const ProductListLayout: React.FC<ProductListLayoutProps> = ({
  products,
  totalProducts,
  categoryName,
  filters,
  currentPage = 1,
  totalPages = 1,
  itemsPerPage = 40,
}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const view = (searchParams.get('view') as 'grid' | 'list') || 'grid'

  const selectedFilters = {
    warehouse: searchParams.get('warehouse')?.split(',') || [],
    onSale: searchParams.get('onSale')?.split(',') || [],
    priceRange: searchParams.get('priceMin') && searchParams.get('priceMax')
      ? [
          Number(searchParams.get('priceMin')),
          Number(searchParams.get('priceMax')),
        ] as [number, number]
      : undefined,
    compatibleOS: searchParams.get('compatibleOS')?.split(',') || [],
    chipType: searchParams.get('chipType')?.split(',') || [],
    function: searchParams.get('function')?.split(',') || [],
    brand: searchParams.get('brand')?.split(',') || [],
    colors: searchParams.get('colors')?.split(',') || [],
    discount: searchParams.get('discount')?.split(',') || [],
  }

  const handleFilterChange = (filterType: string, value: string | string[] | [number, number]) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (filterType === 'priceRange' && Array.isArray(value) && value.length === 2) {
      params.set('priceMin', value[0].toString())
      params.set('priceMax', value[1].toString())
    } else if (Array.isArray(value)) {
      if (value.length === 0) {
        params.delete(filterType)
      } else {
        params.set(filterType, value.join(','))
      }
    } else {
      params.set(filterType, value as string)
    }
    
    params.set('page', '1')
    router.push(`${pathname}?${params.toString()}`)
  }

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', page.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const renderPagination = () => {
    if (totalPages <= 1) return null

    const pages: (number | 'ellipsis')[] = []
    const maxVisible = 7

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i)
        }
      } else {
        pages.push(1)
        pages.push('ellipsis')
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }

    return (
      <Pagination className="mt-8">
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(currentPage - 1)
                }}
              />
            </PaginationItem>
          )}

          {pages.map((page, index) => {
            if (page === 'ellipsis') {
              return (
                <PaginationItem key={`ellipsis-${index}`}>
                  <PaginationEllipsis />
                </PaginationItem>
              )
            }

            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  onClick={(e) => {
                    e.preventDefault()
                    handlePageChange(page)
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          })}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(currentPage + 1)
                }}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    )
  }

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8">
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filter Sidebar */}
        {filters && (
          <FilterSidebar
            categoryName={categoryName}
            filters={filters}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />
        )}

        {/* Main Content */}
        <div className="flex-1">
          <ProductListToolbar totalProducts={totalProducts} />

          <ProductGrid products={products} variant={view === 'grid' ? 'primary' : 'secondary'} view={view} />

          {renderPagination()}
        </div>
      </div>
    </div>
  )
}

