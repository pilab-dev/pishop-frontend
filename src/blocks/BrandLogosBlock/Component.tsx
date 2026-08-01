import React from 'react'
import { BrandLogosProps } from '@/payload-types'
import { BrandLogosSection } from '@/components/brand-logos-section'

export const BrandLogosBlock: React.FC<BrandLogosProps> = (props) => {
  // BrandLogosSection currently has hardcoded images.
  // We can pass the logos array down once BrandLogosSection is updated.
  return <BrandLogosSection logos={props.logos} />
}
