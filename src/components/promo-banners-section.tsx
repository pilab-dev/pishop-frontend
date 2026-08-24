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
    <section className="w-full bg-white py-12">
      <div className="mx-auto max-w-[1280px] px-5">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {banners.map((banner, index) => {
            const media = typeof banner.image === 'string' ? null : banner.image
            const imageUrl = getMediaUrl(media?.url)
            const href = banner.link || '#'

            return (
              <Link
                key={index}
                href={href}
                className="group relative flex h-48 items-center overflow-hidden bg-gray-100 transition-shadow hover:shadow-lg"
              >
                {/* Product image — right-aligned */}
                <div className="absolute right-0 top-0 h-full w-1/2">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={media?.alt || banner.heading}
                      fill
                      className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-200">
                      <FaShoppingCart className="text-gray-400" size={24} />
                    </div>
                  )}
                </div>

                {/* Gradient overlay + text — left side */}
                <div className="relative z-10 flex h-full w-full flex-col justify-center gap-1 bg-gradient-to-r from-white/95 via-white/70 to-transparent p-6">
                  {banner.subheading && (
                    <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                      {banner.subheading}
                    </p>
                  )}
                  <h3 className="font-heading text-lg font-bold uppercase text-gray-900 leading-tight">
                    {banner.heading}
                  </h3>
                  {banner.priceText && (
                    <p className="text-sm font-semibold text-primary">
                      {banner.priceText}
                    </p>
                  )}
                  {banner.ctaText && (
                    <span className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-cta px-5 py-2 text-xs font-semibold uppercase tracking-wide text-cta-foreground transition-colors group-hover:bg-cta/90">
                      <span>{banner.ctaText}</span>
                      <FaShoppingCart className="text-[10px]" />
                    </span>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
