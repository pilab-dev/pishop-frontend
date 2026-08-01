import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export type PromoBannersSectionProps = {
  banners?: { image: string | Media; link?: string | null }[] | null
}

export const PromoBannersSection = ({ banners }: PromoBannersSectionProps) => {
  if (!banners || banners.length === 0) return null

  return (
    <div className="w-full bg-white py-12">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((banner, index) => {
            const media = typeof banner.image === 'string' ? null : banner.image
            const imageUrl = getMediaUrl(media?.url)
            const href = banner.link || '#'

            return (
              <Link
                key={index}
                href={href}
                className="bg-gray-100 flex items-center gap-4 relative overflow-hidden group hover:shadow-md transition-shadow"
              >
                <div className="w-full h-40 relative flex-shrink-0">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={media?.alt || `Promo banner ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FaShoppingCart className="text-gray-400" size={24} />
                    </div>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
