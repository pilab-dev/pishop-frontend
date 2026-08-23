'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Camera, Headphones, Laptop, Smartphone, Watch, type LucideIcon } from 'lucide-react'
import type { Product } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'

const BADGE_ICONS: Record<string, LucideIcon> = {
  headphones: Headphones,
  watch: Watch,
  smartphone: Smartphone,
  camera: Camera,
  laptop: Laptop,
}

const BADGE_COLORS: Record<string, string> = {
  red: 'bg-red-600',
  blue: 'bg-blue-600',
  green: 'bg-green-600',
}

export interface BestProposesTile {
  product: Product
  icon?: string | null
  color?: string | null
}

function CategoryBadge({ icon, color }: { icon?: string | null; color?: string | null }) {
  const Icon = (icon && BADGE_ICONS[icon]) || Headphones
  return (
    <span className="absolute left-3 top-3 z-10">
      {/* Pulsing glow ring, same motif as HotDealsSection's nav buttons */}
      <span
        aria-hidden
        className={`absolute inset-0 -m-1 rounded-full opacity-60 animate-pulse ${
          (color && BADGE_COLORS[color]) || BADGE_COLORS.red
        }`}
      />
      <span
        className={`relative flex h-8 w-8 items-center justify-center text-white ${
          (color && BADGE_COLORS[color]) || BADGE_COLORS.red
        }`}
      >
        <Icon className="h-4 w-4" />
      </span>
    </span>
  )
}

function ProductSpecs({ product }: { product: Product }) {
  const specs = product.tags.slice(0, 3)
  if (specs.length === 0) return null
  return (
    <ul className="mt-2 space-y-1 text-xs text-gray-500">
      {specs.map((spec) => (
        <li key={spec}>{spec}</li>
      ))}
    </ul>
  )
}

function LargeTile({ product, icon, color }: BestProposesTile) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      whileHover={{ y: -4 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="h-full"
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative flex h-full flex-col justify-center bg-white p-6 shadow-md hover:shadow-xl transition-shadow"
      >
        <CategoryBadge icon={icon} color={color} />
        <div className="relative mx-auto mb-4 h-56 w-56">
          {product.images?.[0] && (
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText || product.name}
              fill
              className="object-contain"
            />
          )}
        </div>
        <h3 className="font-semibold text-gray-900">{product.name}</h3>
        <p className="mt-1 font-bold text-primary">
          {formatCurrency(product.basePrice.amount, product.basePrice.currencyCode)}
        </p>
        <ProductSpecs product={product} />
      </Link>
    </motion.div>
  )
}

function SmallTile({ product, icon, color, index = 0 }: BestProposesTile & { index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: index * 0.1 }}
      whileHover={{ y: -3 }}
    >
      <Link
        href={`/product/${product.slug}`}
        className="relative flex items-center gap-4 bg-white p-4 shadow-md hover:shadow-xl transition-shadow"
      >
        <CategoryBadge icon={icon} color={color} />
        <div className="relative h-20 w-20 flex-shrink-0">
          {product.images?.[0] && (
            <Image
              src={product.images[0].url}
              alt={product.images[0].altText || product.name}
              fill
              className="object-contain"
            />
          )}
        </div>
        <div className="min-w-0">
          <h3 className="truncate font-semibold text-gray-900">{product.name}</h3>
          <p className="mt-1 font-bold text-primary">
            {formatCurrency(product.basePrice.amount, product.basePrice.currencyCode)}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}

export function BestProposesClient({
  primary,
  secondary,
  tabs,
}: {
  primary: BestProposesTile
  secondary: BestProposesTile[]
  tabs?: string[]
}) {
  return (
    <div className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
      {/* Decorative concentric circles, pulsing slowly like HotDealsSection's oval-decor backdrop */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-10 top-1/2 hidden h-[420px] w-[420px] -translate-y-1/2 rounded-full border border-gray-100 md:block"
      >
        <div className="absolute inset-8 rounded-full border border-gray-100" />
        <div className="absolute inset-16 rounded-full border border-gray-100" />
      </motion.div>

      {tabs && tabs.length > 0 && (
        <div className="absolute -top-14 right-0 flex gap-6 text-sm font-semibold uppercase text-gray-500">
          {tabs.map((label, i) => (
            <span key={label} className={i === 0 ? 'text-gray-900 border-b-2 border-primary pb-1' : ''}>
              {label}
            </span>
          ))}
        </div>
      )}

      <div className="relative z-10 min-h-[320px]">
        <LargeTile product={primary.product} icon={primary.icon} color={primary.color} />
      </div>

      <div className="relative z-10 flex flex-col justify-center gap-4">
        {secondary.map((tile, i) => (
          <SmallTile key={tile.product.id} product={tile.product} icon={tile.icon} color={tile.color} index={i} />
        ))}
      </div>
    </div>
  )
}
