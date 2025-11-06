'use client'

import { memo, useEffect, useMemo, useRef, useState, useTransition } from 'react'

import LoadingDots from '@/components/loading-dots'
import Price from '@/components/price'
import { DEFAULT_OPTION } from '@/lib/constants'
import { cn } from '@/lib/utils'
import { ShoppingCartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { useCartStore } from '@/store/cart-store'
import { CartItem as CartItemType } from '@/lib/client'

import CloseCart from './close-cart'
import { DeleteItemButton } from './delete-item-button'
import { EditItemQuantityButton } from './edit-item-quantity-button'
import { Dialog, DialogContent } from '../ui/dialog'

interface CartItemProps {
  item: CartItemType
  onProductClick: () => void
}

const CartItem = memo(function CartItem({ item, onProductClick }: CartItemProps) {
  const image = item.product.images?.[0]
  const productUrl = `/product/${item.product.slug}`

  return (
    <li
      key={item.id}
      className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
    >
      <div className="relative flex w-full flex-row justify-between px-1 py-4">
        <div className="absolute z-40 -ml-1 -mt-2">
          <DeleteItemButton itemId={item.id} />
        </div>
        <div className="flex flex-row">
          <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
            {image ? (
              <Image
                className="h-full w-full object-cover"
                width={64}
                height={64}
                alt={image.altText || item.product.name}
                src={image.url}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm">
                {item.product.name.charAt(0)}
              </div>
            )}
          </div>
          <Link
            href={productUrl}
            onClick={onProductClick}
            className="z-30 ml-2 flex flex-row space-x-4"
          >
            <div className="flex flex-1 flex-col text-base">
              <span className="leading-tight">{item.product.name}</span>
              {item.product.name !== DEFAULT_OPTION ? (
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {item.product.shortDescription || ''}
                </p>
              ) : null}
            </div>
          </Link>
        </div>
        <div className="flex h-16 flex-col justify-between">
          <Price
            className="flex justify-end space-y-2 text-right text-sm"
            amount={item.totalPrice.amount}
            currencyCode={item.totalPrice.currencyCode}
          />
          <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
            <EditItemQuantityButton
              itemId={item.id}
              currentQuantity={item.quantity}
              type="minus"
            />
            <p className="w-6 text-center">
              <span className="w-full text-sm">{item.quantity}</span>
            </p>
            <EditItemQuantityButton
              itemId={item.id}
              currentQuantity={item.quantity}
              type="plus"
            />
          </div>
        </div>
      </div>
    </li>
  )
})

interface CartModalProps {
  isOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

export default function CartModal({ isOpen: externalIsOpen, onOpenChange }: CartModalProps = {}) {
  const { cart, isLoading, init } = useCartStore()
  const [internalIsOpen, setInternalIsOpen] = useState(false)

  // Use external state if provided, otherwise use internal state
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen
  const setIsOpen = onOpenChange || setInternalIsOpen


  useEffect(() => {
    init()
  }, [init])

  const items = cart?.items || []
  const totals = cart?.totals
  const total = cart?.totals.total.amount || 0
  const itemCount = cart?.totals.itemCount || 0
  const hasItems = items.length > 0
  const currencyCode = cart?.totals.total.currencyCode || 'HUF'

  // Memoize sorted items to prevent recreating array on every render
  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.product.name.localeCompare(b.product.name)),
    [items]
  )

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent
        className={cn(
          'fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l p-6',
          'border-neutral-200 bg-white text-black dark:border-neutral-700',
          'dark:bg-neutral-900 dark:text-white md:w-[390px]',
          // Override Radix UI default animations for sidebar positioning
          'data-[state=open]:translate-x-0 data-[state=closed]:translate-x-full',
          'transition-transform duration-200 ease-in-out',
        )}
      >
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">My Cart</p>
          <button aria-label="Close cart" onClick={() => setIsOpen(false)}>
            <CloseCart />
          </button>
        </div>

        {isLoading && !hasItems ? (
          <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
            <LoadingDots className="bg-black dark:bg-white" />
          </div>
        ) : !hasItems ? (
          <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
            <ShoppingCartIcon className="h-16" />
            <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between overflow-hidden p-1">
            <ul className="flex-grow overflow-auto py-4">
              {sortedItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onProductClick={() => setIsOpen(false)}
                />
              ))}
            </ul>
            <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 dark:border-neutral-700">
                <p>Taxes</p>
                <Price
                  className="text-right text-base text-black dark:text-white"
                  amount={totals?.tax.amount ?? 0}
                  currencyCode={totals?.tax.currencyCode ?? currencyCode}
                />
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>Shipping</p>
                {totals?.shipping.amount ? (
                  <Price
                    className="text-right text-base text-black dark:text-white"
                    amount={totals.shipping.amount}
                    currencyCode={totals.shipping.currencyCode}
                  />
                ) : (
                  <p className="text-right">Calculated at checkout</p>
                )}
              </div>
              <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                <p>Total</p>
                <Price
                  className="text-right text-base text-black dark:text-white"
                  amount={totals?.total.amount ?? total}
                  currencyCode={totals?.total.currencyCode ?? currencyCode}
                />
              </div>
            </div>
            <CheckoutButton disabled={!hasItems} />
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

function CheckoutButton({ disabled }: { disabled: boolean }) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(() => {
      router.push('/checkout')
    })
  }

  return (
    <button
      className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-60"
      type="button"
      onClick={handleClick}
      disabled={disabled || isPending}
    >
      {isPending ? <LoadingDots className="bg-white" /> : 'Proceed to Checkout'}
    </button>
  )
}
