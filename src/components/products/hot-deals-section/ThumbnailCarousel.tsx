import Image from 'next/image'
import { hotDealsData } from './data'

interface ThumbnailCarouselProps {
  currentDealIndex: number
  onSelectDeal: (index: number) => void
}

export const ThumbnailCarousel = ({ currentDealIndex, onSelectDeal }: ThumbnailCarouselProps) => {
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      {hotDealsData.map((deal, i) => (
        <div
          role="button"
          key={i}
          onClick={() => onSelectDeal(i)}
          className={`bg-white w-[70px] h-[70px] cursor-pointer shadow-xl rounded-sm transition-all duration-200 ${
            i === currentDealIndex ? 'ring-2 ring-primary-600 scale-110' : 'hover:scale-105'
          }`}
        >
          <Image
            src={deal.image}
            alt={`View ${deal.title}`}
            width={70}
            height={70}
            className="object-contain w-full h-full p-1"
          />
        </div>
      ))}
    </div>
  )
}

