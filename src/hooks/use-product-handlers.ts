import { Product } from '@/lib/client'
import { useCallback } from 'react'

export const useProductHandlers = (
  updateOption: (name: string, value: string) => Record<string, string>,
  updateURL: (state: Record<string, string>) => void,
  addToCart: (product: Product, quantity: number) => void
) => {
  const handleOptionSelect = useCallback((optionName: string, value: string) => {
    const newState = updateOption(optionName, value)
    updateURL(newState)
  }, [updateOption, updateURL])

  const handleSizeSelect = useCallback((value: string) => {
    handleOptionSelect('size', value)
  }, [handleOptionSelect])

  const handleColorSelect = useCallback((value: string) => {
    handleOptionSelect('color', value)
  }, [handleOptionSelect])

  const handleBuyNow = useCallback((product: Product, quantity: number) => {
    addToCart(product, quantity)
  }, [addToCart])

  return {
    handleOptionSelect,
    handleSizeSelect,
    handleColorSelect,
    handleBuyNow
  }
}
