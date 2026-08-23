import React from 'react'
import { PromoBannersProps } from '@/payload-types'
import { PromoBannersSection } from '@/components/promo-banners-section'

export const PromoBannersBlock: React.FC<PromoBannersProps> = (props) => {
  return <PromoBannersSection banners={props.banners} />
}
