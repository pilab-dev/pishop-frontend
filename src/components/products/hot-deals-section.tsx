'use client'

// import { Product } from "@pilab/pishop-client";
import { Product } from '@/lib/client'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Image from 'next/image'
import { FC, useState } from 'react'
import { FancyTitle } from '../fancy-title'
import { SectionDecor } from '../ui/section-decor'
import ProductButtons from './product-buttons'

type HotDealsSectionProps = {
  products?: Product[] // Optional since we use hardcoded data
  productSlug?: string // Product identifier from PayloadCMS block
}

// Sample hot deals data - in a real app, this would come from an API
const hotDealsData = [
  {
    title: 'Beats Studio Wireless Over-Ear Black Headphones',
    description: 'Video games are a big part of our lives.',
    features: [
      '32mm speakers, 1.2mm Cable',
      '32mm speakers, 1.2mm Cable',
      '32mm speakers, 1.2mm Cable',
      '32mm speakers, 1.2mm Cable',
    ],
    currentPrice: '99.99$',
    originalPrice: '199.99$',
    image: '/images/headphone.webp',
    thumbnailImages: ['/images/headphone.webp', '/images/headphone.webp', '/images/headphone.webp'],
  },
  {
    title: 'Gaming Mechanical Keyboard RGB',
    description: 'Enhance your gaming experience with premium switches.',
    features: [
      'Cherry MX switches',
      'RGB backlighting',
      'Anti-ghosting technology',
      'USB-C connectivity',
    ],
    currentPrice: '149.99$',
    originalPrice: '299.99$',
    image: '/images/headphone.webp', // Using same image for demo
    thumbnailImages: ['/images/headphone.webp', '/images/headphone.webp', '/images/headphone.webp'],
  },
  {
    title: 'Wireless Gaming Mouse Pro',
    description: 'Precision and comfort for long gaming sessions.',
    features: [
      '1000Hz polling rate',
      '50-hour battery life',
      'RGB lighting effects',
      'Programmable buttons',
    ],
    currentPrice: '79.99$',
    originalPrice: '129.99$',
    image: '/images/headphone.webp', // Using same image for demo
    thumbnailImages: ['/images/headphone.webp', '/images/headphone.webp', '/images/headphone.webp'],
  },
]

export const HotDealsSection: FC<HotDealsSectionProps> = ({ products = [], productSlug }) => {
  const [currentDealIndex, setCurrentDealIndex] = useState(0)
  const [direction, setDirection] = useState<'up' | 'down'>('down')

  const currentDeal = hotDealsData[currentDealIndex]

  const nextDeal = () => {
    setDirection('down')
    setCurrentDealIndex((prev) => (prev + 1) % hotDealsData.length)
  }

  const prevDeal = () => {
    setDirection('up')
    setCurrentDealIndex((prev) => (prev - 1 + hotDealsData.length) % hotDealsData.length)
  }

  const slideVariants = {
    enter: (direction: 'up' | 'down') => ({
      y: direction === 'down' ? 50 : -50,
      opacity: 0,
    }),
    center: {
      y: 0,
      opacity: 1,
    },
    exit: (direction: 'up' | 'down') => ({
      y: direction === 'down' ? -50 : 50,
      opacity: 0,
    }),
  }
  return (
    <div className="page-gray-800 pt-14 pb-5">
      <section className="max-w-[1280px] relative mx-auto px-5 py-5 min-h-[500px]">
        <div
          className="absolute -left-32 -top-32 -right-0 -bottom-5 oval-decor"
          style={{
            pointerEvents: 'none',
          }}
        />

        {/* Navigation Buttons */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 flex flex-col gap-2">
          <button
            onClick={prevDeal}
            className="w-12 h-12 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
          >
            <ChevronUp className="h-6 w-6 text-black" />
          </button>
          <button
            onClick={nextDeal}
            className="w-12 h-12 bg-yellow-400 hover:bg-yellow-500 rounded-full flex items-center justify-center shadow-lg transition-colors duration-200"
          >
            <ChevronDown className="h-6 w-6 text-black" />
          </button>
        </div>

        {/* Static Title */}
        <div className="flex justify-center mb-8">
          <h2 className="flex items-center uppercase text-5xl font-bold">
            <SectionDecor />
            <FancyTitle label="This week's Hot Deals" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center min-h-[400px]">
          {/* Animated Main Content */}
          <div className="flex justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentDealIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  y: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                }}
              >
                <Image
                  src={currentDeal.image}
                  alt="Featured Products"
                  width={300}
                  height={300}
                  className="h-[300px] w-[300px] object-contain"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Static Thumbnail Carousel */}
          <div className="flex flex-col justify-center items-center gap-4">
            {hotDealsData.map((deal, i) => (
              <div
                role="button"
                key={i}
                onClick={() => {
                  if (i > currentDealIndex) {
                    setDirection('down')
                  } else if (i < currentDealIndex) {
                    setDirection('up')
                  }
                  setCurrentDealIndex(i)
                }}
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

          {/* Animated Text Content */}
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentDealIndex}
              custom={direction}
              className="flex flex-col justify-start gap-4"
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                y: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
              }}
            >
              <p>{currentDeal.description}</p>

              <p className="font-bold">{currentDeal.title}</p>

              <ul className="list-disc list-inside space-y-1">
                {currentDeal.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <span className="text-lg uppercase products-font">
                <span className="font-bold">Price: </span>
                <span className="text-primary font-bold">{currentDeal.currentPrice}</span>
                <span className="line-through italic text-gray-400 ml-2">
                  {currentDeal.originalPrice}
                </span>
              </span>

              <ProductButtons show noWishlist noCompare handle={productSlug || ''} />
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
