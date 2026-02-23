import { Product } from '@/lib/client'

export type MediaResource = {
  alt: string
  url: {
    alt: string
    url: string
    width: number
    height: number
    thumbnailURL: string
  }
}

export const isProduct = (product: any): product is Product => {
  return product?.id !== undefined
    && typeof product.name === 'string'
    && typeof product.slug === 'string'
    && typeof product.description === 'string'
    && typeof product.images === 'object'
}

export const isImage = (resource: any): resource is MediaResource => {
  return (
    typeof resource.alt === 'string' &&
    typeof resource.url === 'object' &&
    typeof resource.url.url === 'string' &&
    typeof resource.url.width === 'number' &&
    typeof resource.url.height === 'number' &&
    typeof resource.url.thumbnailURL === 'string'
  )
}
