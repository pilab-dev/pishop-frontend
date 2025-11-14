'use client'

import { ChevronDown, ChevronUp } from 'lucide-react'
import { FC } from 'react'

type QuantitySelectorProps = {
  value: number
  onChange: (value: number) => void
}

export const QuantitySelector: FC<QuantitySelectorProps> = ({
  value,
  onChange,
}) => {
  const increment = () => onChange(value + 1)
  const decrement = () => onChange(Math.max(1, value - 1))

  return (
    <div className="flex items-center border border-white/20 bg-white/10">
      <button
        type="button"
        onClick={decrement}
        className="flex h-10 w-10 items-center justify-center text-white hover:bg-white/10"
        aria-label="Decrease quantity"
      >
        <ChevronDown className="h-4 w-4" />
      </button>
      <div className="flex h-10 w-12 items-center justify-center bg-white text-gray-900">
        <span className="text-sm font-medium">{value}</span>
      </div>
      <button
        type="button"
        onClick={increment}
        className="flex h-10 w-10 items-center justify-center text-white hover:bg-white/10"
        aria-label="Increase quantity"
      >
        <ChevronUp className="h-4 w-4" />
      </button>
    </div>
  )
}

