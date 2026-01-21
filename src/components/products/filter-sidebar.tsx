'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

export interface FilterOption {
  label: string
  value: string
  count?: number
  color?: string
}

export interface PriceRange {
  min: number
  max: number
}

export interface FilterData {
  warehouse?: FilterOption[]
  onSale?: FilterOption[]
  priceRange?: PriceRange
  compatibleOS?: FilterOption[]
  chipType?: FilterOption[]
  function?: FilterOption[]
  brand?: FilterOption[]
  colors?: FilterOption[]
  discount?: FilterOption[]
}

export interface SelectedFilters {
  warehouse: string[]
  onSale: string[]
  priceRange?: [number, number]
  compatibleOS: string[]
  chipType: string[]
  function: string[]
  brand: string[]
  colors: string[]
  discount: string[]
}

export interface FilterSidebarProps {
  categoryName?: string
  filters: FilterData
  selectedFilters: SelectedFilters
  onFilterChange: (filterType: string, value: string | string[] | [number, number]) => void
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categoryName,
  filters,
  selectedFilters,
  onFilterChange,
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    warehouse: true,
    onSale: true,
    priceRange: true,
    compatibleOS: false,
    chipType: false,
    function: false,
    brand: false,
    colors: false,
    discount: false,
  })

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleCheckboxChange = (filterType: string, value: string, checked: boolean) => {
    const currentValues = selectedFilters[filterType as keyof SelectedFilters] as string[] || []
    const newValues = checked
      ? [...currentValues, value]
      : currentValues.filter(v => v !== value)
    onFilterChange(filterType, newValues)
  }

  const handlePriceRangeChange = (values: number[]) => {
    if (values.length === 2) {
      onFilterChange('priceRange', [values[0], values[1]])
    }
  }

  const renderFilterSection = (
    title: string,
    filterType: string,
    options?: FilterOption[]
  ) => {
    if (!options || options.length === 0) return null

    return (
      <div className="border-b border-gray-100">
        <Button
          variant="ghost"
          className="w-full justify-between p-4 h-auto font-medium"
          onClick={() => toggleSection(filterType)}
        >
          {title}
          {openSections[filterType] ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {openSections[filterType] && (
          <div className="px-4 pb-4">
            <div className="space-y-3">
              {options.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${filterType}-${option.value}`}
                    checked={(selectedFilters[filterType as keyof SelectedFilters] as string[] || []).includes(option.value)}
                    onCheckedChange={(checked) => handleCheckboxChange(filterType, option.value, checked as boolean)}
                  />
                  <Label
                    htmlFor={`${filterType}-${option.value}`}
                    className="text-sm font-normal cursor-pointer flex-1"
                  >
                    {filterType === 'colors' && option.color ? (
                      <div className="flex items-center gap-2">
                        <div
                          className="w-4 h-4 rounded-full border border-gray-300"
                          style={{ backgroundColor: option.color }}
                        />
                        {option.label}
                      </div>
                    ) : (
                      option.label
                    )}
                    {option.count !== undefined && (
                      <span className="text-gray-500 ml-1">({option.count})</span>
                    )}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderPriceRangeSection = () => {
    if (!filters.priceRange) return null

    const { min, max } = filters.priceRange
    const currentRange = selectedFilters.priceRange || [min, max]

    return (
      <div className="border-b border-gray-100">
        <Button
          variant="ghost"
          className="w-full justify-between p-4 h-auto font-medium"
          onClick={() => toggleSection('priceRange')}
        >
          Price Range
          {openSections.priceRange ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
        {openSections.priceRange && (
          <div className="px-4 pb-4">
            <div className="space-y-4">
              <div className="flex gap-2 items-center">
                <div className="flex-1">
                  <Label htmlFor="price-min" className="text-sm">Min</Label>
                  <Input
                    id="price-min"
                    type="number"
                    value={currentRange[0]}
                    onChange={(e) => handlePriceRangeChange([Number(e.target.value), currentRange[1]])}
                    min={min}
                    max={max}
                    className="mt-1"
                  />
                </div>
                <div className="flex-1">
                  <Label htmlFor="price-max" className="text-sm">Max</Label>
                  <Input
                    id="price-max"
                    type="number"
                    value={currentRange[1]}
                    onChange={(e) => handlePriceRangeChange([currentRange[0], Number(e.target.value)])}
                    min={min}
                    max={max}
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="w-full lg:w-80 bg-white border-r border-gray-200">
      <div className="sticky top-0 p-4 border-b border-gray-200 bg-white">
        <h2 className="text-lg font-semibold">
          {categoryName ? `Filters for ${categoryName}` : 'Filters'}
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {renderFilterSection('Warehouse', 'warehouse', filters.warehouse)}
        {renderFilterSection('Sale Status', 'onSale', filters.onSale)}
        {renderPriceRangeSection()}
        {renderFilterSection('Compatible OS', 'compatibleOS', filters.compatibleOS)}
        {renderFilterSection('Chip Type', 'chipType', filters.chipType)}
        {renderFilterSection('Function', 'function', filters.function)}
        {renderFilterSection('Brand', 'brand', filters.brand)}
        {renderFilterSection('Colors', 'colors', filters.colors)}
        {renderFilterSection('Discount', 'discount', filters.discount)}
      </div>
    </div>
  )
}