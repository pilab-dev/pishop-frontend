'use client'

import { ProductOptionGroup, ProductVariant } from '@/lib/client'
import { cn } from '@/lib/utils'
import { FC, useMemo } from 'react'

type SizeSelectorProps = {
  optionGroups: ProductOptionGroup[]
  variants: ProductVariant[]
  selectedValue?: string
  onSelect: (value: string) => void
}

export const SizeSelector: FC<SizeSelectorProps> = ({
  optionGroups,
  variants,
  selectedValue,
  onSelect,
}) => {
  const sizeOption = optionGroups.find((opt) => opt.name.toLowerCase() === 'size')
  if (!sizeOption) return null

  const sizeValues = useMemo(() => {
    return sizeOption.values.sort((a, b) => {
      const order = ['XS', 'S', 'M', 'L', 'XL', 'XXL']
      const aIndex = order.indexOf(a.toUpperCase())
      const bIndex = order.indexOf(b.toUpperCase())
      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex
      if (aIndex !== -1) return -1
      if (bIndex !== -1) return 1
      return a.localeCompare(b)
    })
  }, [sizeOption])

  return (
    <div className="flex flex-wrap gap-2">
      {sizeValues.map((size) => {
        const isSelected = selectedValue === size

        return (
          <button
            key={size}
            type="button"
            onClick={() => onSelect(size)}
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all',
              isSelected
                ? 'bg-gray-800 text-white'
                : 'bg-white/10 text-white hover:bg-white/20',
            )}
            aria-label={`Select size ${size}`}
          >
            {size}
          </button>
        )
      })}
    </div>
  )
}

