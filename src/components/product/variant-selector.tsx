'use client'

import { useProduct, useUpdateURL } from '@/components/product/product-context'
import { useVariantOptions } from '@/hooks/use-variant-options'
import { ProductOption, ProductVariant } from '@/lib/client'
import clsx from 'clsx'

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

  const { optionGroups, isVariantAvailable } = useVariantOptions(options, variants)

  return Object.entries(optionGroups).map(([optionName, values]) => (
    <form key={optionName}>
        <dl className="mb-8">
        <dt className="mb-4 text-sm uppercase tracking-wide">{optionName}</dt>
          <dd className="flex flex-wrap gap-3">
          {values.map((value) => {
            const isAvailableForSale = isVariantAvailable(optionName, value, variants)
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
