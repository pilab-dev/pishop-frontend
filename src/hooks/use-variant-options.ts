import { ProductOption, ProductVariant } from '@/lib/client'
import { useMemo } from 'react'

export const useVariantOptions = (options: ProductOption[], variants: ProductVariant[]) => {
  const optionGroups = useMemo(() => {
    return options.reduce((acc, option) => {
      const optionName = option.name.toLowerCase()
      if (!acc[optionName]) {
        acc[optionName] = []
      }
      // Find unique values for this option across variants
      variants.forEach(variant => {
        const variantOption = variant.options.find(o => o.name.toLowerCase() === optionName)
        if (variantOption && !acc[optionName].includes(variantOption.value)) {
          acc[optionName].push(variantOption.value)
        }
      })
      return acc
    }, {} as Record<string, string[]>)
  }, [options, variants])

  const isVariantAvailable = (optionName: string, value: string, variants: ProductVariant[]) => {
    const matchingVariant = variants.find(variant =>
      variant.options.some(option =>
        option.name.toLowerCase() === optionName && option.value === value
      ) && variant.isActive
    )
    return !!matchingVariant
  }

  return {
    optionGroups,
    isVariantAvailable
  }
}
