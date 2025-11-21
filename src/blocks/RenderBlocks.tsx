import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { BentoBoxBlock } from '@/blocks/BentoBoxBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { BestSellersBlock } from './BestSellersBlock/Component'
import { FeaturedProductsBlock } from './FeaturedProductsBlock/Component'
import { HeroBlock } from './HeroBlock/Component'
import { HotDealsBlock } from './HotDealsBlock/Component'
import { ProductGridBlock } from './ProductGridBlock/Component'
import { ProductShowcaseBlock } from './ProductShowcaseBlock/Component'
import { PromotionalBannerBlock } from './PromotionalBannerBlock/Component'

const blockComponents = {
  bentoBox: BentoBoxBlock,
  featuredProducts: FeaturedProductsBlock,
  bestSellers: BestSellersBlock,
  hero: HeroBlock,
  hotDealsBlock: HotDealsBlock,
  productGrid: ProductGridBlock,
  productShowcase: ProductShowcaseBlock,
  promotionalBanner: PromotionalBannerBlock,
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
}

export const RenderBlocks: React.FC<{
  blocks: Page['elements'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <Block
                  /* @ts-expect-error there may be some mismatch between the expected types here */
                  key={`block-${index}`}
                  {...block}
                  /* @ts-expect-error there may be some mismatch between the expected types here */
                  disableInnerContainer
                />
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
