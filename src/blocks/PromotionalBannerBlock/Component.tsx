import React from 'react'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'

import type { PromotionalBannerProps } from '@/payload-types'

export const PromotionalBannerBlock: React.FC<PromotionalBannerProps> = (props) => {
  const {
    content,
    backgroundImage,
    backgroundColor = '#000000',
    textColor = '#ffffff',
    height = 'medium',
    alignment = 'center',
    callToAction,
    behavior,
  } = props

  const heightClasses = {
    small: 'py-4',
    medium: 'py-8',
    large: 'py-16',
    full: 'py-24 min-h-screen flex items-center',
  }

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const safeHeight = height || 'medium'
  const safeAlignment = alignment || 'center'

  const buttonStyleClasses = {
    primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
    ghost: 'hover:bg-accent hover:text-accent-foreground',
  }

  return (
    <section
      className={`relative ${heightClasses[safeHeight]} ${behavior?.sticky ? 'sticky top-0 z-50' : ''}`}
      style={{
        backgroundColor: backgroundImage ? undefined : backgroundColor || '#000000',
        color: textColor || '#ffffff',
      }}
    >
      {backgroundImage && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${(backgroundImage as any)?.url})`,
          }}
        />
      )}

      <div className={`container relative z-10 ${alignmentClasses[safeAlignment]}`}>
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-invert max-w-none">
            <RichText data={content} />
          </div>

          {callToAction?.text && callToAction?.link && (
            <div className={`mt-6 ${callToAction.position === 'below' ? 'text-center' : 'inline-block ml-4'}`}>
              <CMSLink
                url={callToAction.link}
                className={`inline-flex items-center px-6 py-3 rounded-md font-medium transition-colors ${buttonStyleClasses[callToAction.style || 'primary']}`}
              >
                {callToAction.text}
              </CMSLink>
            </div>
          )}

          {behavior?.dismissible && (
            <button
              className="absolute top-4 right-4 text-current hover:opacity-70 transition-opacity"
              aria-label="Dismiss banner"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {backgroundImage && (
        <div
          className="absolute inset-0 bg-black/20"
          style={{ backgroundColor: backgroundColor || '#000000' }}
        />
      )}
    </section>
  )
}
