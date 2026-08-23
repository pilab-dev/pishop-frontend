'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { Gamepad2, Headphones, Laptop, Smartphone, Tv, Watch, type LucideIcon } from 'lucide-react'
import type { Product } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'

const ICONS: Record<string, LucideIcon> = {
  headphones: Headphones,
  watch: Watch,
  smartphone: Smartphone,
  gamepad: Gamepad2,
  laptop: Laptop,
  tv: Tv,
}

// Mirrors HotDealsSection's slideVariants (hooks/useHotDeals.ts) so category
// switches here feel like the same motion language as the rest of the home
// page, just sliding horizontally (tabs are laid out left-to-right) instead
// of vertically.
const gridVariants = {
  enter: (direction: 'left' | 'right') => ({
    x: direction === 'right' ? 40 : -40,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (direction: 'left' | 'right') => ({
    x: direction === 'right' ? -40 : 40,
    opacity: 0,
  }),
}

export interface PopularProductCategory {
  label: string
  icon: string
  products: Product[]
}

function ProductTile({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group relative flex flex-col bg-white p-4 border border-gray-100 hover:shadow-lg hover:z-10 transition-shadow"
    >
      <div className="relative mb-3 aspect-square overflow-hidden bg-gray-50">
        {product.images?.[0] && (
          <Image
            src={product.images[0].url}
            alt={product.images[0].altText || product.name}
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        )}
      </div>
      <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">{product.name}</h3>
      <p className="mt-1 font-bold text-primary">
        {formatCurrency(product.basePrice.amount, product.basePrice.currencyCode)}
      </p>
    </Link>
  )
}

export function PopularProductClient({ categories }: { categories: PopularProductCategory[] }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState<'left' | 'right'>('right')
  const active = categories[activeIndex]
  if (!active) return null

  const selectCategory = (index: number) => {
    if (index === activeIndex) return
    setDirection(index > activeIndex ? 'right' : 'left')
    setActiveIndex(index)
  }

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        {categories.map((category, index) => {
          const Icon = ICONS[category.icon] || Headphones
          const isActive = index === activeIndex
          return (
            <button
              key={category.label + index}
              type="button"
              onClick={() => selectCategory(index)}
              aria-label={category.label}
              aria-current={isActive}
              className={`relative flex h-10 w-10 items-center justify-center transition-colors ${
                isActive ? 'bg-primary text-black' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="popular-product-active-tab"
                  className="absolute inset-0 bg-primary"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
              <Icon className="h-4 w-4" />
            </button>
          )
        })}
      </div>

      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={gridVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
            }}
            className="grid grid-cols-2 gap-4 md:grid-cols-4"
          >
            {active.products.map((product) => (
              <ProductTile key={product.id} product={product} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
