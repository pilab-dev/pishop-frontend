'use client'

import { FancyTitle } from '../../fancy-title'
import { SectionDecor } from '../../ui/section-decor'
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
      <section className="max-w-[1280px] relative mx-auto min-h-[500px]">
        <div className="absolute top-0 left-40 h-full mx-auto px-5 py-5">
          <NavigationButtons onPrev={prevDeal} onNext={nextDeal} />
        </div>

        <div
          className="absolute -left-32 -top-32 -right-0 -bottom-5 oval-decor"
          style={{
            pointerEvents: 'none',
          }}
        />

        <div className="pt-14 pb-5">
          {/* Static Title */}
          <div className="flex justify-center mb-8">
            <h2 className="flex items-center uppercase text-5xl font-bold">
              <SectionDecor />
              <FancyTitle label="This week's Hot Deals" />
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-[400px]">
            <DealImage
              image={currentDeal.image}
              title={currentDeal.title}
              slideVariants={slideVariants}
              direction={direction}
              currentDealIndex={currentDealIndex}
            />

            <ThumbnailCarousel currentDealIndex={currentDealIndex} onSelectDeal={goToDeal} />

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
