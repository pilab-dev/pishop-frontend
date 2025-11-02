'use client'

import { memo, useCallback, useTransition } from 'react'

import clsx from 'clsx'
import { MinusIcon, PlusIcon } from 'lucide-react'
import { toast } from 'sonner'

import { useCartStore } from '@/store/cart-store'

const QuantityButton = memo(function QuantityButton({
  type,
  disabled,
  onClick,
}: {
  type: 'plus' | 'minus'
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={type === 'plus' ? 'Increase item quantity' : 'Reduce item quantity'}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full p-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
        {
          'ml-auto': type === 'minus',
        },
        disabled && 'cursor-not-allowed opacity-60',
      )}
    >
      {type === 'plus' ? (
        <PlusIcon className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <MinusIcon className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  )
})

export const EditItemQuantityButton = memo(function EditItemQuantityButton({
  itemId,
  currentQuantity,
  type,
}: {
  itemId: string
  currentQuantity: number
  type: 'plus' | 'minus'
}) {
  const { updateItemQuantity, isLoading } = useCartStore()
  const [isPending, startTransition] = useTransition()

  const nextQuantity = type === 'plus' ? currentQuantity + 1 : currentQuantity - 1

  const handleClick = useCallback(() => {
    startTransition(async () => {
      try {
        if (nextQuantity <= 0) {
          await updateItemQuantity(itemId, nextQuantity)
          toast.success('Item removed from cart', { duration: 2000 })
        } else {
          await updateItemQuantity(itemId, nextQuantity)
          toast.success(`Quantity updated to ${nextQuantity}`, { duration: 2000 })
        }
      } catch (error) {
        toast.error('Failed to update quantity', { duration: 3000 })
      }
    })
  }, [updateItemQuantity, itemId, nextQuantity])

  return (
    <QuantityButton
      type={type}
      onClick={handleClick}
      disabled={isPending || isLoading || nextQuantity < 0}
    />
  )
})
