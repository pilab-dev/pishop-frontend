'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { FC, useCallback, useMemo } from 'react'
import { FaArrowsAltH, FaCartPlus, FaEye, FaRegHeart } from 'react-icons/fa'

import type { Product } from '@/lib/client'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/cart-store'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@ui/tooltip'

type ProductButtonsProps = {
  show: boolean
  product?: Product
  handle?: string
  notForSale?: boolean
  noWishlist?: boolean
  noCompare?: boolean
  hideDetails?: boolean
}

export const ProductButtons: FC<ProductButtonsProps> = ({
  show = false,
  product,
  handle,
  notForSale = false,
  noWishlist = false,
  noCompare = false,
  hideDetails = false,
}) => {
  const router = useRouter()
  const { addToCart, isLoading } = useCartStore()

  const resolvedHandle = handle ?? product?.slug ?? ''

  const isCartDisabled = useMemo(() => {
    if (notForSale) return true
    if (!product) return true
    return !product.isActive
  }, [notForSale, product])

  const buttonVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      // transition: { duration: 0.2, delay: 0 },
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
    },
  }

  const whileHover = {
    scale: 1.3,
    transition: { duration: 0.2, delay: 0 },
  }

  const handleAddToCart = useCallback(() => {
    if (!product || isCartDisabled) {
      return
    }

    void addToCart(product, 1)
  }, [addToCart, isCartDisabled, product])

  const handleNavigateTo = (location?: string) => () => {
    if (!location) return

    router.push(location)
  }

  const baseButtonClasses =
    'rounded-full p-3 text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2'

  return (
    <TooltipProvider>
      <AnimatePresence>
        {show && (
          <div className="bottom-0 left-0 right-0 flex flex-row gap-2 pb-5">
            {!hideDetails && (
              <Tooltip delayDuration={0}>
                <TooltipTrigger asChild>
                  <motion.button
                    type="button"
                    animate="visible"
                    exit="hidden"
                    initial="hidden"
                    role="link"
                    aria-label="View details"
                    data-href={resolvedHandle ? `/product/${resolvedHandle}` : undefined}
                    onClick={handleNavigateTo(
                      resolvedHandle ? `/product/${resolvedHandle}` : undefined,
                    )}
                    transition={{ duration: 0.2 }}
                    variants={buttonVariants}
                    whileHover={whileHover}
                    className={cn(
                      baseButtonClasses,
                      'bg-gray-600 drop-shadow cursor-pointer hover:bg-primary/90',
                    )}
                  >
                    <FaEye />
                  </motion.button>
                </TooltipTrigger>
                <TooltipContent>View details</TooltipContent>
              </Tooltip>
            )}

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <motion.button
                  type="button"
                  animate="visible"
                  aria-label="Compare product"
                  disabled={noCompare}
                  exit="hidden"
                  initial="hidden"
                  transition={{ duration: 0.2 }}
                  variants={buttonVariants}
                  whileHover={whileHover}
                  className={cn(
                    baseButtonClasses,
                    'bg-blue-800 drop-shadow',
                    noCompare
                      ? 'cursor-not-allowed opacity-60'
                      : 'cursor-pointer hover:bg-primary/90',
                  )}
                >
                  <FaArrowsAltH />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>Compare</TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <motion.button
                  type="button"
                  animate="visible"
                  aria-label="Add to wishlist"
                  disabled={noWishlist}
                  exit="hidden"
                  initial="hidden"
                  transition={{ duration: 0.2 }}
                  variants={buttonVariants}
                  whileHover={whileHover}
                  className={cn(
                    baseButtonClasses,
                    'bg-blue-800',
                    noWishlist
                      ? 'cursor-not-allowed opacity-60'
                      : 'cursor-pointer hover:bg-primary/90',
                  )}
                >
                  <FaRegHeart />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>Add to wishlist</TooltipContent>
            </Tooltip>

            <Tooltip delayDuration={0}>
              <TooltipTrigger asChild>
                <motion.button
                  type="button"
                  animate="visible"
                  aria-label="Add to cart"
                  aria-busy={isLoading}
                  disabled={isCartDisabled}
                  exit="hidden"
                  initial="hidden"
                  transition={{ duration: 0.2 }}
                  variants={buttonVariants}
                  whileHover={whileHover}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  className={cn(
                    baseButtonClasses,
                    'bg-blue-800',
                    isCartDisabled
                      ? 'cursor-not-allowed opacity-60'
                      : 'cursor-pointer hover:bg-primary/90',
                  )}
                >
                  <FaCartPlus className={cn(isLoading && 'animate-pulse')} />
                </motion.button>
              </TooltipTrigger>
              <TooltipContent>{isCartDisabled ? 'Unavailable' : 'Add to cart'}</TooltipContent>
            </Tooltip>
          </div>
        )}
      </AnimatePresence>
    </TooltipProvider>
  )
}

export default ProductButtons
