import { AnimatePresence, motion } from 'framer-motion'
import ProductButtons from '../product-buttons'
import type { HotDeal } from './types'

interface DealContentProps {
  deal: HotDeal
  slideVariants: any
  direction: 'up' | 'down'
  currentDealIndex: number
  productSlug?: string
}

export const DealContent = ({
  deal,
  slideVariants,
  direction,
  currentDealIndex,
  productSlug,
}: DealContentProps) => {
  return (
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
        <span>{deal.description}</span>
        <span className="font-bold">{deal.title}</span>
        <ul className="list-disc list-inside space-y-1">
          {deal.features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <span className="text-lg uppercase products-font">
          <span className="font-uppercase">Price: </span>
          <span className="text-primary font-bold">{deal.currentPrice}</span>
          <span className="line-through italic text-gray-400 ml-2">{deal.originalPrice}</span>
        </span>

        <ProductButtons show noWishlist noCompare handle={productSlug || ''} />
      </motion.div>
    </AnimatePresence>
  )
}
