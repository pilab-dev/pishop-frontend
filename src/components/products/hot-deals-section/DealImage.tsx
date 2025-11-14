import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'

interface DealImageProps {
  image: string
  title: string
  slideVariants: any
  direction: 'up' | 'down'
  currentDealIndex: number
}

export const DealImage = ({
  image,
  title,
  slideVariants,
  direction,
  currentDealIndex,
}: DealImageProps) => {
  return (
    <div className="flex justify-center z-30">
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
            src={image}
            alt="Featured Products"
            width={300}
            height={300}
            className="h-[300px] w-[300px] object-contain"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
