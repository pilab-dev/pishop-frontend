'use client'
import { useHeaderTheme } from '@/providers/HeaderTheme'
import React, { useEffect } from 'react'

import type { Page } from '@/payload-types'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

export const TechHero: React.FC<Page['hero'] & { style?: string }> = ({ links, media, richText, style }) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div className="relative flex items-center justify-center text-white bg-black overflow-hidden" data-theme="dark">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/50 to-black/80 z-10" />
         {/* Add some tech-y geometric shapes or gradients here if needed */}
      </div>

      <div className="container relative z-20 py-24 md:py-32">
        <div className={`grid gap-12 items-center ${style === 'card' ? 'md:grid-cols-1' : 'md:grid-cols-2'}`}>
          
          {/* Text Content */}
          <div className={`flex flex-col ${style === 'card' ? 'items-center text-center max-w-3xl mx-auto' : 'items-start text-left'}`}>
            {richText && (
              <div className="prose prose-invert max-w-none mb-8">
                <RichText data={richText} enableGutter={false} />
              </div>
            )}
            
            {Array.isArray(links) && links.length > 0 && (
              <ul className="flex flex-wrap gap-4">
                {links.map(({ link }, i) => {
                  return (
                    <li key={i}>
                      <CMSLink {...link} appearance="default" className="bg-yellow-500 text-black hover:bg-yellow-400 font-bold px-6 py-3 rounded-full transition-colors" />
                    </li>
                  )
                })}
              </ul>
            )}
          </div>

          {/* Media Content */}
          <div className={`relative ${style === 'card' ? 'w-full max-w-4xl mx-auto mt-8' : 'h-[500px] w-full'}`}>
             {style === 'card' ? (
                <div className="relative bg-white rounded-lg shadow-2xl p-4 md:p-8 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                   {media && typeof media === 'object' && (
                    <Media resource={media} className="w-full h-auto rounded" />
                  )}
                   {/* Optional overlay or badge could go here */}
                </div>
             ) : (
               <div className="relative h-full w-full flex items-center justify-center">
                  {media && typeof media === 'object' && (
                    <Media resource={media} imgClassName="object-contain max-h-full drop-shadow-2xl" priority />
                  )}
               </div>
             )}
          </div>

        </div>
      </div>
    </div>
  )
}
