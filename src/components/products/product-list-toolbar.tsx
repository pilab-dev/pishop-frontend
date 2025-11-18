'use client'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Grid3x3, List } from 'lucide-react'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type SortOption = 'newest' | 'price-high' | 'price-low' | 'popular'
type ViewMode = 'grid' | 'list'

interface ProductListToolbarProps {
  totalProducts?: number
  defaultSort?: SortOption
  defaultView?: ViewMode
  itemsPerPageOptions?: number[]
  defaultItemsPerPage?: number
}

export const ProductListToolbar: React.FC<ProductListToolbarProps> = ({
  totalProducts,
  defaultSort = 'newest',
  defaultView = 'grid',
  itemsPerPageOptions = [20, 40, 60, 80],
  defaultItemsPerPage = 40,
}) => {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const sort = (searchParams.get('sort') as SortOption) || defaultSort
  const view = (searchParams.get('view') as ViewMode) || defaultView
  const itemsPerPage = Number(searchParams.get('perPage')) || defaultItemsPerPage

  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set(key, value)
    router.push(`${pathname}?${params.toString()}`)
  }

  const sortOptions = [
    { value: 'newest', label: 'Newest Arrivals' },
    { value: 'price-high', label: 'Price high to low' },
    { value: 'price-low', label: 'Price low to high' },
    { value: 'popular', label: 'Most popular' },
  ]

  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-600">Sort by:</span>
        <Select value={sort} onValueChange={(value) => updateSearchParam('sort', value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant={view === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => updateSearchParam('view', 'grid')}
            className="h-9 w-9"
          >
            <Grid3x3 className="h-4 w-4" />
          </Button>
          <Button
            variant={view === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => updateSearchParam('view', 'list')}
            className="h-9 w-9"
          >
            <List className="h-4 w-4" />
          </Button>
        </div>

        <Select
          value={itemsPerPage.toString()}
          onValueChange={(value) => updateSearchParam('perPage', value)}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {itemsPerPageOptions.map((option) => (
              <SelectItem key={option} value={option.toString()}>
                {option} per page
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

