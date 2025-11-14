'use client'

import { ProductOptionGroup, ProductVariant } from '@/lib/client'
import { cn } from '@/lib/utils'
import { FC } from 'react'

type ColorSwatchSelectorProps = {
  optionGroups: ProductOptionGroup[]
  variants: ProductVariant[]
  selectedValue?: string
  onSelect: (value: string) => void
}

export const ColorSwatchSelector: FC<ColorSwatchSelectorProps> = ({
  optionGroups,
  variants,
  selectedValue,
  onSelect,
}) => {
  const colorOption = optionGroups.find((opt) => opt.name.toLowerCase() === 'color')
  if (!colorOption) return null

  const colorValues = colorOption.values

  const colorMap: Record<string, string> = {
    black: '#000000',
    white: '#FFFFFF',
    gray: '#808080',
    grey: '#808080',
    blue: '#0000FF',
    green: '#00FF00',
    yellow: '#FFFF00',
    red: '#FF0000',
    orange: '#FFA500',
    purple: '#800080',
    pink: '#FFC0CB',
    brown: '#A52A2A',
  }

  return (
    <div className="flex flex-wrap gap-2">
      {colorValues.map((color) => {
        const normalizedColor = color.toLowerCase()
        const colorHex =
          colorMap[normalizedColor] ||
          (normalizedColor.startsWith('#') ? normalizedColor : '#808080')
        const isSelected = selectedValue === color

        return (
          <button
            key={color}
            type="button"
            onClick={() => onSelect(color)}
            className={cn(
              'h-8 w-8 rounded-full border-2 transition-all',
              isSelected
                ? 'border-gray-800 ring-2 ring-gray-600'
                : 'border-white/30 hover:border-white/50',
            )}
            style={{ backgroundColor: colorHex }}
            aria-label={`Select color ${color}`}
          />
        )
      })}
    </div>
  )
}

