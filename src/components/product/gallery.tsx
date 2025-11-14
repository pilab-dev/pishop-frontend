'use client'

import { GridTileImage } from '@/components/grid/tile'
import { useProduct, useUpdateURL } from '@/components/product/product-context'
import { Instagram, Twitter } from 'lucide-react'
import Image from 'next/image'
import { useMemo } from 'react'

export function Gallery({ images }: { images: { src: string; altText: string }[] }) {
  const { state, updateImage } = useProduct()
  const updateURL = useUpdateURL()
  const imageIndex = state.image ? parseInt(state.image) : 0

  const currentImage = images[imageIndex]
  const shareUrl = typeof window !== 'undefined' ? window.location.href : ''
  const shareTitle = 'Check out this product!'

  const shareLinks = useMemo(
    () => ({
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
      instagram: '#',
      google: `https://plus.google.com/share?url=${encodeURIComponent(shareUrl)}`,
    }),
    [shareUrl, shareTitle],
  )

  const handleShare = (platform: keyof typeof shareLinks) => {
    if (platform === 'instagram') {
      return
    }
    window.open(shareLinks[platform], '_blank', 'width=600,height=400')
  }

  return (
    <div className="flex flex-col">
      <form>
        <div className="relative aspect-square w-full overflow-hidden bg-white">
          {currentImage ? (
            <Image
              className="h-full w-full object-contain"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt={currentImage.altText}
              src={currentImage.src}
              priority={true}
              itemProp="image"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-100">
              <div className="text-center">
                <div className="mb-2 text-6xl text-gray-400">📷</div>
                <p className="text-sm text-gray-500">No image available</p>
              </div>
            </div>
          )}
        </div>
      </form>

      {images.length > 1 && (
        <div className="mt-6 flex flex-col gap-6">
          <ul className="flex items-center justify-center gap-2 overflow-auto">
            {images.slice(0, 5).map((image, index) => {
              const isActive = index === imageIndex

              return (
                <li key={image.src} className="h-20 w-20 flex-shrink-0">
                  <button
                    formAction={() => {
                      const newState = updateImage(index.toString())
                      updateURL(newState)
                    }}
                    aria-label="Select product image"
                    className="h-full w-full"
                  >
                    <GridTileImage
                      alt={image.altText}
                      src={image.src}
                      width={80}
                      height={80}
                      active={isActive}
                    />
                  </button>
                </li>
              )
            })}
          </ul>
        </div>
      )}

      <div className="mt-6 flex items-center gap-4">
        <span className="text-sm font-medium text-gray-700">SHARE THIS:</span>
        <div className="flex gap-3">
          <button
            onClick={() => handleShare('facebook')}
            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-50"
            aria-label="Share on Facebook"
          >
            <span className="text-sm font-bold">f</span>
          </button>
          <button
            onClick={() => handleShare('twitter')}
            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-50"
            aria-label="Share on Twitter"
          >
            <Twitter className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleShare('instagram')}
            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-gray-800 text-white transition-colors hover:bg-gray-700"
            aria-label="Share on Instagram"
          >
            <Instagram className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleShare('google')}
            className="flex h-8 w-8 items-center justify-center rounded border border-gray-300 bg-white text-gray-700 transition-colors hover:bg-gray-50"
            aria-label="Share on Google"
          >
            <span className="text-sm font-bold">G</span>
          </button>
        </div>
      </div>
    </div>
  )
}
