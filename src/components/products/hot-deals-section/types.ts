import type { Product } from '@/lib/client'

export type HotDealsSectionProps = {
  products?: Product[] // Optional since we use hardcoded data
  productSlug?: string // Product identifier from PayloadCMS block
}

export interface HotDeal {
  title: string
  description: string
  features: string[]
  currentPrice: string
  originalPrice: string
  image: string
  thumbnailImages: string[]
}

