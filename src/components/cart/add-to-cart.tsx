'use client'

import { Product } from '@/lib/client'
import { useCartStore } from '@/store/cart-store'
import clsx from 'clsx'
import { PlusIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

function SubmitButton({
  availableForSale,
  isPending,
}: {
  availableForSale: boolean
  isPending: boolean
}) {
  const buttonClasses =
    'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white transition-opacity duration-200'
  const disabledClasses = 'cursor-not-allowed opacity-60 hover:opacity-60'

  if (!availableForSale) {
    return (
      <button disabled className={clsx(buttonClasses, disabledClasses)}>
        Out Of Stock
      </button>
    )
  }

  return (
    <button
      type="submit"
      aria-label="Add to cart"
      disabled={isPending}
      className={clsx(buttonClasses, {
        'hover:opacity-90': !isPending,
        'opacity-70 cursor-wait': isPending,
      })}
    >
      <div className="absolute left-0 ml-4">
        <PlusIcon className="h-5" />
      </div>
      {isPending ? 'Adding...' : 'Add To Cart'}
    </button>
  )
}

export function AddToCart({ product }: { product: Product }) {
  const { addToCart, isLoading, error } = useCartStore()
  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!product.isActive) {
      return
    }

    startTransition(async () => {
      try {
        await addToCart(product, 1)
        toast.success(`${product.name} has been added to your cart`, {
          duration: 3000,
        })
      } catch (err) {
        toast.error('Failed to add to cart. Please try again.', {
          duration: 4000,
        })
      }
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <SubmitButton availableForSale={product.isActive} isPending={isPending || isLoading} />
      {error && (
        <p aria-live="polite" className="sr-only" role="status">
          {error}
        </p>
      )}
    </form>
  )
}
