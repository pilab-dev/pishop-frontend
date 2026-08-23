import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart } from 'react-icons/fa'
import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export type PromoBannerTile = {
  image: string | Media
  heading: string
  subheading?: string | null
  priceText?: string | null
  ctaText?: string | null
  link?: string | null
}

export type PromoBannersSectionProps = {
  banners?: PromoBannerTile[] | null
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
                      alt={media?.alt || banner.heading}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <FaShoppingCart className="text-gray-400" size={24} />
                    </div>
                  )}

                  <div className="absolute inset-0 flex flex-col justify-center gap-1 p-5 bg-gradient-to-r from-white/90 via-white/60 to-transparent">
                    <p className="text-base font-bold uppercase text-gray-900 leading-tight">
                      {banner.heading}
                    </p>
                    {banner.subheading && (
                      <p className="text-sm text-gray-600">{banner.subheading}</p>
                    )}
                    {banner.priceText && (
                      <p className="text-sm font-semibold text-primary">{banner.priceText}</p>
                    )}
                    {banner.ctaText && (
                      <span className="mt-2 inline-flex w-fit items-center rounded-full bg-neutral-900 px-4 py-1.5 text-xs font-semibold text-white group-hover:bg-neutral-800 transition-colors">
                        {banner.ctaText}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
