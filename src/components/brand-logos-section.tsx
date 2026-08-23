import Image from 'next/image'
import Link from 'next/link'
import type { Media } from '@/payload-types'
import { getMediaUrl } from '@/utilities/getMediaUrl'

export type BrandLogosSectionProps = {
  logos?: { image: string | Media; link?: string | null }[] | null
}

export const BrandLogosSection = ({ logos }: BrandLogosSectionProps) => {
  if (!logos || logos.length === 0) return null

  return (
    <div className="w-full bg-white border-t border-b border-gray-200 py-12">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="flex flex-row flex-wrap justify-center md:justify-between items-center gap-8">
          {logos.map((logo, index) => {
            const media = typeof logo.image === 'string' ? null : logo.image
            const imageUrl = getMediaUrl(media?.url)
            const href = logo.link || '#'

            return (
              <Link
                key={index}
                href={href}
                className="flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity"
              >
                {imageUrl ? (
                  <div className="relative w-24 h-12 grayscale hover:grayscale-0 transition-all">
                    <Image
                      src={imageUrl}
                      alt={media?.alt || `Brand logo ${index + 1}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : null}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}
