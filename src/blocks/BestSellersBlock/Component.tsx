import React from 'react'

import type { BestSellersProps } from '@/payload-types'

export const BestSellersBlock: React.FC<BestSellersProps> = (props) => {
  const { title, subtitle, displaySettings, callToAction } = props

  // This is a placeholder component - the actual implementation would fetch products
  // based on the source configuration and render them according to displaySettings

  return (
    <section className="py-12">
      <div className="container">
        {title && (
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">{title}</h2>
            {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
          </div>
        )}

        {/* Placeholder for product grid/carousel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Products would be rendered here based on source and display settings */}
          <div className="border rounded-lg p-4">
            <div className="aspect-square bg-muted rounded mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
            </div>
          </div>
        </div>

        {callToAction?.text && callToAction?.link && (
          <div className="text-center">
            <a
              href={callToAction.link}
              className={`inline-flex items-center px-6 py-3 rounded-md font-medium transition-colors ${
                callToAction.style === 'primary'
                  ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                  : callToAction.style === 'secondary'
                  ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  : callToAction.style === 'outline'
                  ? 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                  : 'text-primary underline-offset-4 hover:underline'
              }`}
            >
              {callToAction.text}
            </a>
          </div>
        )}
      </div>
    </section>
  )
}
