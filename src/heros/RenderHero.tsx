import React from 'react'

import type { Page } from '@/payload-types'

import { CenteredImpactHero } from '@/heros/CenteredImpact'
import { HighImpactHero } from '@/heros/HighImpact'
import { LowImpactHero } from '@/heros/LowImpact'
import { MediumImpactHero } from '@/heros/MediumImpact'
import { SideBySideHero } from '@/heros/SideBySide'
import { TechHero } from '@/heros/TechHero'

const heroes = {
  highImpact: HighImpactHero,
  lowImpact: LowImpactHero,
  mediumImpact: MediumImpactHero,
  centeredImpact: CenteredImpactHero,
  sideBySide: SideBySideHero,
  techHero: TechHero,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  if (!props) return null
  
  const { type } = props

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  // Pass props with type assertion to handle null values
  return <HeroToRender {...(props as any)} />
}
