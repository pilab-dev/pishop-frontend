import {
  Gamepad2,
  Headphones,
  Laptop,
  Smartphone,
  Tv,
  Watch,
  Camera,
  Package,
  type LucideIcon,
} from 'lucide-react'

const KEYWORD_ICONS: Array<[RegExp, LucideIcon]> = [
  [/head ?phone|earbud|earphone|audio/i, Headphones],
  [/laptop|notebook|pc\b|computer/i, Laptop],
  [/phone|mobile|smartphone/i, Smartphone],
  [/watch|wearable/i, Watch],
  [/game|console|gaming/i, Gamepad2],
  [/camera|photo/i, Camera],
  [/tv|television|monitor|display|screen/i, Tv],
]

/**
 * Maps a category name to a representative lucide icon by keyword.
 * Falls back to a generic package icon for categories that don't match
 * any known product-type keyword (the backend has no icon field to key off).
 */
export function getCategoryIcon(categoryName: string): LucideIcon {
  const match = KEYWORD_ICONS.find(([pattern]) => pattern.test(categoryName))
  return match ? match[1] : Package
}
