import React from 'react'
import { HeroSliderProps } from '@/payload-types'
import { HeroSection } from '@/components/hero-section'

export const HeroSliderBlock: React.FC<HeroSliderProps> = (props) => {
  const { slides } = props

  if (!slides || slides.length === 0) {
    return null
  }

  // Currently our HeroSection only supports 1 slide visually, so we pass the first one.
  const firstSlide = slides[0]
  const productId = typeof firstSlide.product === 'string' ? firstSlide.product : firstSlide.product?.id

  return (
    <HeroSection 
      productId={productId}
      badgeText={firstSlide.badgeText || undefined}
      overrideTitle={firstSlide.overrideTitle || undefined}
      overrideDescription={firstSlide.overrideDescription || undefined}
      backgroundImageUrl={typeof firstSlide.backgroundImage === 'object' && firstSlide.backgroundImage !== null ? firstSlide.backgroundImage.url : undefined}
    />
  )
}
