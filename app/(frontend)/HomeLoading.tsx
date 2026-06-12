import { BentoBox, BentoBoxItem } from '@/components/BentoBox'
import { SectionDecor } from '@/components/ui/section-decor'
import { FancyTitle } from '@/components/fancy-title'

export function HomeLoading() {
  return (
    <>
      <div className="h-[60vh] bg-gray-200 animate-pulse" />
      <BentoBox className="max-w-[1280px] mx-auto">
        <BentoBoxItem className="col-span-1 md:col-span-2 row-span-1 md:row-span-2">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-4" />
          </div>
        </BentoBoxItem>
        <BentoBoxItem>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-32" />
          </div>
        </BentoBoxItem>
        <BentoBoxItem>
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-24" />
          </div>
        </BentoBoxItem>
      </BentoBox>

      <div className="bg-gray-100 pt-14 pb-5">
        <section className="max-w-[1280px] mx-auto px-5 pt-5">
          <h2 className="flex items-center uppercase text-4xl font-bold">
            <SectionDecor />
            <FancyTitle label="Popular Product" />
          </h2>
        </section>

        <main>
          <div className="mx-auto max-w-7xl pt-5 px-2 md:px-6 flex-grow">
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-white rounded-lg p-4">
                    <div className="aspect-square bg-gray-200 rounded animate-pulse mb-4" />
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      </div>
    </>
  )
}
