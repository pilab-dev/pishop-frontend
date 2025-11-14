'use client'

import { FancyTitle } from '@/components/fancy-title'
import { SectionDecor } from '@/components/ui/section-decor'
import { DealContent } from './DealContent'
import { DealImage } from './DealImage'
import { NavigationButtons } from './NavigationButtons'
import { ThumbnailCarousel } from './ThumbnailCarousel'
import { useHotDeals } from './hooks/useHotDeals'
import type { HotDealsSectionProps } from './types'

export const HotDealsSection = ({ products = [], productSlug }: HotDealsSectionProps) => {
  const { currentDeal, currentDealIndex, direction, nextDeal, prevDeal, goToDeal, slideVariants } =
    useHotDeals()

  return (
    <div className="page-gray-800 relative">
      <section className="max-w-[1280px] relative mx-auto">
        <div className="absolute top-0 left-40 h-full mx-auto px-5 py-5">
          <NavigationButtons onPrev={prevDeal} onNext={nextDeal} />
        </div>

        {/* Oval Decor */}
        <div
          className="absolute -left-[10%] -top-[10%] right-0 bottom-0 oval-decor"
          style={{
            pointerEvents: 'none',
          }}
        />

        <div className="max-w-[1280px] h-max mx-auto flex flex-row items-center justify-center">
          {/* Static Title */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[480px]">
            <DealImage
              image={currentDeal.image}
              title={currentDeal.title}
              slideVariants={slideVariants}
              direction={direction}
              currentDealIndex={currentDealIndex}
            />
            <ThumbnailCarousel currentDealIndex={currentDealIndex} onSelectDeal={goToDeal} />
          </div>
          <div>
            <h2 className="flex items-center uppercase xl:text-5xl font-bold pb-5">
              <SectionDecor />
              <FancyTitle label="This week's Hot Deals" />
            </h2>

            <DealContent
              deal={currentDeal}
              slideVariants={slideVariants}
              direction={direction}
              currentDealIndex={currentDealIndex}
              productSlug={productSlug}
            />
          </div>
        </div>
      </section>
    </div>
  )
}
