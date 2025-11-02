'use client'

import { memo, useCallback, useTransition } from 'react'

import { X } from 'lucide-react'
import { toast } from 'sonner'

import { useCartStore } from '@/store/cart-store'

export const DeleteItemButton = memo(function DeleteItemButton({ itemId }: { itemId: string }) {
  const { removeFromCart, isLoading } = useCartStore()
  const [isPending, startTransition] = useTransition()

  const handleRemove = useCallback(() => {
    startTransition(async () => {
      try {
        await removeFromCart(itemId)
        toast.success('Item removed from cart', { duration: 2000 })
      } catch (error) {
        toast.error('Failed to remove item from cart', { duration: 3000 })
      }
    })
  }, [removeFromCart, itemId])

  return (
    <button
      type="button"
      aria-label="Remove cart item"
      onClick={handleRemove}
      disabled={isPending || isLoading}
      className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-neutral-500 disabled:cursor-not-allowed disabled:opacity-60"
    >
      <X className="mx-[1px] h-4 w-4 text-white dark:text-black" />
    </button>
  )
})
