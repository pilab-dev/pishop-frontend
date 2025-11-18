'use client'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface FilterOption {
  label: string
  value: string
  count?: number
}

interface FilterSectionProps {
  title: string
  options: FilterOption[]
  selectedValues: string[]
  onToggle: (value: string) => void
  defaultOpen?: boolean
  showViewMore?: boolean
  maxVisible?: number
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  options,
  selectedValues,
  onToggle,
  defaultOpen = true,
  showViewMore = false,
  maxVisible = 5,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)
  const [showAll, setShowAll] = useState(false)

  const visibleOptions = showAll || !showViewMore ? options : options.slice(0, maxVisible)

  return (
    <div className="border-b border-gray-200 py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between text-left font-semibold uppercase text-gray-900 hover:text-primary"
      >
        <span>{title}</span>
        {isOpen ? (
          <ChevronUp className="h-4 w-4" />
        ) : (
          <ChevronDown className="h-4 w-4" />
        )}
      </button>

      {isOpen && (
        <div className="mt-4 space-y-2">
          {visibleOptions.map((option) => (
            <div key={option.value} className="flex items-center space-x-2">
              <Checkbox
                id={`${title}-${option.value}`}
                checked={selectedValues.includes(option.value)}
                onCheckedChange={() => onToggle(option.value)}
              />
              <Label
                htmlFor={`${title}-${option.value}`}
                className="flex-1 cursor-pointer text-sm font-normal text-gray-700"
              >
                {option.label}
                {option.count !== undefined && (
                  <span className="ml-2 text-gray-500">({option.count})</span>
                )}
              </Label>
            </div>
          ))}
          {showViewMore && options.length > maxVisible && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="mt-2 text-sm text-primary hover:underline"
            >
              {showAll ? 'View less -' : 'View more +'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}

interface PriceRangeProps {
  min: number
  max: number
  value: [number, number]
  onChange: (value: [number, number]) => void
}

const PriceRange: React.FC<PriceRangeProps> = ({ min, max, value, onChange }) => {
  const [localValue, setLocalValue] = useState(value)

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Math.max(min, Math.min(Number(e.target.value), localValue[1]))
    const newValue: [number, number] = [newMin, localValue[1]]
    setLocalValue(newValue)
    onChange(newValue)
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Math.min(max, Math.max(Number(e.target.value), localValue[0]))
    const newValue: [number, number] = [localValue[0], newMax]
    setLocalValue(newValue)
    onChange(newValue)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <input
          type="number"
          min={min}
          max={max}
          value={localValue[0]}
          onChange={handleMinChange}
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
        />
        <span className="text-gray-500">to</span>
        <input
          type="number"
          min={min}
          max={max}
          value={localValue[1]}
          onChange={handleMaxChange}
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
        />
      </div>
      <div className="relative h-2 w-full rounded-full bg-gray-200">
        <div
          className="absolute h-2 rounded-full bg-primary"
          style={{
            left: `${((localValue[0] - min) / (max - min)) * 100}%`,
            width: `${((localValue[1] - localValue[0]) / (max - min)) * 100}%`,
          }}
        />
      </div>
    </div>
  )
}

interface ColorOption {
  label: string
  value: string
  color: string
}

interface ColorFilterProps {
  colors: ColorOption[]
  selectedValues: string[]
  onToggle: (value: string) => void
}

const ColorFilter: React.FC<ColorFilterProps> = ({ colors, selectedValues, onToggle }) => {
  return (
    <div className="flex flex-wrap gap-2">
      {colors.map((color) => (
        <button
          key={color.value}
          onClick={() => onToggle(color.value)}
          className={cn(
            'h-8 w-8 rounded-full border-2 transition-all',
            selectedValues.includes(color.value)
              ? 'border-primary ring-2 ring-primary ring-offset-2'
              : 'border-gray-300 hover:border-gray-400'
          )}
          style={{ backgroundColor: color.color }}
          aria-label={color.label}
        />
      ))}
    </div>
  )
}

export interface FilterSidebarProps {
  categoryName?: string
  filters: {
    warehouse?: FilterOption[]
    onSale?: FilterOption[]
    priceRange?: { min: number; max: number }
    compatibleOS?: FilterOption[]
    chipType?: FilterOption[]
    function?: FilterOption[]
    brand?: FilterOption[]
    colors?: ColorOption[]
    discount?: FilterOption[]
  }
  selectedFilters: {
    warehouse?: string[]
    onSale?: string[]
    priceRange?: [number, number]
    compatibleOS?: string[]
    chipType?: string[]
    function?: string[]
    brand?: string[]
    colors?: string[]
    discount?: string[]
  }
  onFilterChange: (filterType: string, value: string | string[] | [number, number]) => void
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categoryName,
  filters,
  selectedFilters,
  onFilterChange,
}) => {
  const handleToggle = (filterType: string) => (value: string) => {
    const current = selectedFilters[filterType as keyof typeof selectedFilters] as string[] | undefined
    const newValues = current?.includes(value)
      ? current.filter((v) => v !== value)
      : [...(current || []), value]
    onFilterChange(filterType, newValues)
  }

  return (
    <aside className="w-full lg:w-64">
      <div className="bg-white p-4 shadow-sm">
        {categoryName && (
          <h2 className="mb-6 text-xl font-bold uppercase text-gray-900">{categoryName}</h2>
        )}

        <div className="space-y-0">
          {filters.warehouse && filters.warehouse.length > 0 && (
            <FilterSection
              title="Warehouse Options"
              options={filters.warehouse}
              selectedValues={selectedFilters.warehouse || []}
              onToggle={handleToggle('warehouse')}
            />
          )}

          {filters.onSale && filters.onSale.length > 0 && (
            <FilterSection
              title="Narrow Search Results"
              options={filters.onSale}
              selectedValues={selectedFilters.onSale || []}
              onToggle={handleToggle('onSale')}
            />
          )}

          {filters.priceRange && (
            <div className="border-b border-gray-200 py-4">
              <h3 className="mb-4 font-semibold uppercase text-gray-900">Price Range</h3>
              <PriceRange
                min={filters.priceRange.min}
                max={filters.priceRange.max}
                value={selectedFilters.priceRange || [filters.priceRange.min, filters.priceRange.max]}
                onChange={(value) => onFilterChange('priceRange', value)}
              />
            </div>
          )}

          {filters.compatibleOS && filters.compatibleOS.length > 0 && (
            <FilterSection
              title="Compatible OS"
              options={filters.compatibleOS}
              selectedValues={selectedFilters.compatibleOS || []}
              onToggle={handleToggle('compatibleOS')}
            />
          )}

          {filters.chipType && filters.chipType.length > 0 && (
            <FilterSection
              title="Chip type"
              options={filters.chipType}
              selectedValues={selectedFilters.chipType || []}
              onToggle={handleToggle('chipType')}
            />
          )}

          {filters.function && filters.function.length > 0 && (
            <FilterSection
              title="Function"
              options={filters.function}
              selectedValues={selectedFilters.function || []}
              onToggle={handleToggle('function')}
              showViewMore
              maxVisible={5}
            />
          )}

          {filters.brand && filters.brand.length > 0 && (
            <FilterSection
              title="Brand"
              options={filters.brand}
              selectedValues={selectedFilters.brand || []}
              onToggle={handleToggle('brand')}
              showViewMore
              maxVisible={5}
            />
          )}

          {filters.colors && filters.colors.length > 0 && (
            <div className="border-b border-gray-200 py-4">
              <h3 className="mb-4 font-semibold uppercase text-gray-900">Color</h3>
              <ColorFilter
                colors={filters.colors}
                selectedValues={selectedFilters.colors || []}
                onToggle={handleToggle('colors')}
              />
            </div>
          )}

          {filters.discount && filters.discount.length > 0 && (
            <div className="border-b border-gray-200 py-4">
              <h3 className="mb-4 font-semibold uppercase text-gray-900">Discount</h3>
              <select className="w-full rounded border border-gray-300 px-3 py-2 text-sm">
                <option>Choose your discount</option>
                {filters.discount.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}

