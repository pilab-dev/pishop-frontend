import { useState } from 'react'
import { hotDealsData } from '../data'

export const useHotDeals = () => {
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

  const goToDeal = (index: number) => {
    if (index > currentDealIndex) {
      setDirection('down')
    } else if (index < currentDealIndex) {
      setDirection('up')
    }
    setCurrentDealIndex(index)
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

  return {
    currentDeal,
    currentDealIndex,
    direction,
    nextDeal,
    prevDeal,
    goToDeal,
    slideVariants,
    dealsCount: hotDealsData.length,
  }
}
