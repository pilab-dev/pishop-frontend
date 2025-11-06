'use client'

import { useProduct, useUpdateURL } from '@/components/product/product-context'
import { ProductOption, ProductVariant } from '@/lib/client'
import clsx from 'clsx'

type Combination = {
  id: string
  availableForSale: boolean
  [key: string]: string | boolean
}

export function VariantSelector({
  options,
  variants,
}: {
  options: ProductOption[]
  variants: ProductVariant[]
}) {
  const { state, updateOption } = useProduct()
  const updateURL = useUpdateURL()
  const hasNoVariantsOrJustOneVariant = !variants.length || variants.length === 1

  if (hasNoVariantsOrJustOneVariant) {
    return null
  }

  // Group variants by option type for display
  const optionGroups = options.reduce((acc, option) => {
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

  return Object.entries(optionGroups).map(([optionName, values]) => (
    <form key={optionName}>
        <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase tracking-wide">{optionName}</dt>
          <dd className="flex flex-wrap gap-3">
          {values.map((value) => {
            // Check if this combination exists and is active
            const matchingVariant = variants.find(variant =>
              variant.options.some(option =>
                option.name.toLowerCase() === optionName && option.value === value
              ) && variant.isActive
            )
            const isAvailableForSale = !!matchingVariant
            const isActive = state[optionName] === value

              return (
                <button
                  formAction={() => {
                  const newState = updateOption(optionName, value)
                    updateURL(newState)
                  }}
                  key={value}
                  aria-disabled={!isAvailableForSale}
                  disabled={!isAvailableForSale}
                title={`${optionName} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
                  className={clsx(
                    'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
                    {
                      'cursor-default ring-2 ring-blue-600': isActive,
                      'ring-1 ring-transparent transition duration-300 ease-in-out hover:ring-blue-600':
                        !isActive && isAvailableForSale,
                      'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
                        !isAvailableForSale,
                    },
                  )}
                >
                  {value}
                </button>
              )
            })}
          </dd>
        </dl>
      </form>
    ))
}
