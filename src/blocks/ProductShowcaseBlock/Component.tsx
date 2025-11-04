import React from 'react'

import { CMSLink } from '@/components/Link'

import type { ProductShowcaseProps } from '@/payload-types'

export const ProductShowcaseBlock: React.FC<ProductShowcaseProps> = (props) => {
  const {
    title,
    subtitle,
    showcaseType,
    layout,
    contentSettings,
    callToAction,
  } = props

  // This is a placeholder component - the actual implementation would fetch and render
  // products based on the showcaseType, source, and layout configurations

  const getGridClasses = () => {
    const columns = layout?.columns || '4'
    const spacing = layout?.spacing || 'normal'

    const columnClasses = {
      '2': 'grid-cols-1 md:grid-cols-2',
      '3': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
      '4': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
      '5': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
      '6': 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    }

    const spacingClasses = {
      tight: 'gap-2',
      normal: 'gap-4',
      loose: 'gap-8',
    }

    return `${columnClasses[columns]} ${spacingClasses[spacing]}`
  }

  return (
    <section className="py-12">
      <div className="container">
        {(title || subtitle) && (
          <div className="text-center mb-8">
            {title && <h2 className="text-3xl font-bold mb-2">{title}</h2>}
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
        )}

        {/* Product Grid/Carousel Placeholder */}
        <div className={`grid ${getGridClasses()} mb-8`}>
          {/* Products would be rendered here based on configuration */}
          {Array.from({ length: parseInt(layout?.columns || '4') }, (_, i) => (
            <div key={i} className="group relative">
              {/* Product Card Placeholder */}
              <div className="aspect-square bg-muted rounded-lg mb-4 overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-muted to-muted-foreground/20"></div>
                {contentSettings?.showBadges && (
                  <div className="absolute top-2 left-2">
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                      NEW
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {contentSettings?.showTitle && (
                  <h3 className="font-medium text-sm">Product Title {i + 1}</h3>
                )}
                {contentSettings?.showPrice && (
                  <div className="flex items-center gap-2">
                    <span className="font-bold">$99.99</span>
                    {contentSettings?.showComparePrice && (
                      <span className="text-muted-foreground line-through text-sm">$129.99</span>
                    )}
                  </div>
                )}
                {contentSettings?.showQuickAdd && (
                  <button className="w-full bg-primary text-primary-foreground py-2 px-4 rounded text-sm font-medium hover:bg-primary/90 transition-colors">
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {callToAction?.text && callToAction?.link && (
          <div className={`text-center ${
            callToAction.position === 'topRight' ? 'absolute top-4 right-4' :
            callToAction.position === 'bottomCenter' ? 'text-center' : 'text-center'
          }`}>
            <CMSLink
              url={callToAction.link}
              className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-md font-medium hover:bg-primary/90 transition-colors"
            >
              {callToAction.text}
            </CMSLink>
          </div>
        )}
      </div>
    </section>
  )
}
