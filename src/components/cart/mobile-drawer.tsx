'use client'

import { ShoppingCartIcon as CartIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { memo, useEffect, useMemo } from 'react'

import LoadingDots from '@/components/loading-dots'
import Price from '@/components/price'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCartStore } from '@/store/cart-store'
import { SiX } from 'react-icons/si'
import { DeleteItemButton } from './delete-item-button'
import { EditItemQuantityButton } from './edit-item-quantity-button'

interface CartItemProps {
  item: CartItem
  onProductClick: () => void
}

const CartItem = memo(function CartItem({ item, onProductClick }: CartItemProps) {
  const image = item.product.images?.[0]
  const productUrl = `/product/${item.product.slug}`

  return (
    <li className="flex w-full flex-col border-b border-neutral-700">
      <div className="relative flex w-full flex-row justify-between px-1 py-4">
        <div className="absolute z-40 -ml-1 -mt-2">
          <DeleteItemButton itemId={item.id} />
        </div>
        <div className="flex flex-row">
          <div className="relative h-16 w-16 overflow-hidden rounded-md border border-neutral-600 bg-neutral-700">
            {image ? (
              <Image
                className="h-full w-full object-cover"
                width={64}
                height={64}
                alt={image.altText || item.product.name}
                src={image.url}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm text-white">
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
              <span className="leading-tight text-white">{item.product.name}</span>
              <p className="text-sm text-gray-400">{item.product.shortDescription || ''}</p>
            </div>
          </Link>
        </div>
        <div className="flex h-16 flex-col justify-between">
          <Price
            className="flex justify-end space-y-2 text-right text-sm text-white"
            amount={item.totalPrice.amount}
            currencyCode={item.totalPrice.currencyCode}
          />
          <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-600">
            <EditItemQuantityButton itemId={item.id} currentQuantity={item.quantity} type="minus" />
            <p className="w-6 text-center">
              <span className="w-full text-sm text-white">{item.quantity}</span>
            </p>
            <EditItemQuantityButton itemId={item.id} currentQuantity={item.quantity} type="plus" />
          </div>
        </div>
      </div>
    </li>
  )
})

interface MobileCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  onOpenChange?: (open: boolean) => void
}

export function MobileCartDrawer({ isOpen, onClose }: MobileCartDrawerProps) {
  const { cart, isLoading, init } = useCartStore()
  const router = useRouter()

  useEffect(() => {
    init()
  }, [init])

  // Close drawer on ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const items = cart?.items || []
  const totals = cart?.totals
  const total = cart?.totals.total.amount || 0
  const itemCount = cart?.totals.itemCount || 0
  const hasItems = items.length > 0
  const currencyCode = cart?.totals.total.currencyCode || 'HUF'

  const sortedItems = useMemo(
    () => [...items].sort((a, b) => a.product.name.localeCompare(b.product.name)),
    [items],
  )

  const handleCheckout = () => {
    onClose()
    router.push('/checkout')
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 sm:hidden" onClick={onClose} />}

      {/* Drawer */}
      <div
        className={cn(
          'fixed right-0 top-0 z-50 h-full w-full max-w-sm transform bg-black text-white transition-transform duration-300 ease-in-out sm:hidden',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-neutral-700 p-4">
            <h2 className="text-lg font-semibold text-white">Shopping Cart</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 text-white hover:bg-gray-800"
            >
              <SiX className="h-4 w-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {isLoading && !hasItems ? (
              <div className="flex h-full w-full flex-col items-center justify-center">
                <LoadingDots className="bg-black dark:bg-white" />
              </div>
            ) : !hasItems ? (
              <div className="flex h-full w-full flex-col items-center justify-center p-6">
                <CartIcon className="h-16 w-16 text-gray-400" />
                <p className="mt-4 text-center text-lg font-medium text-gray-300">
                  Your cart is empty
                </p>
              </div>
            ) : (
              <div className="flex h-full flex-col">
                {/* Cart Items */}
                <ul className="flex-1 overflow-y-auto p-4">
                  {sortedItems.map((item) => (
                    <CartItem key={item.id} item={item} onProductClick={onClose} />
                  ))}
                </ul>

                {/* Cart Summary */}
                <div className="border-t border-neutral-700 p-4">
                  <div className="space-y-2 text-sm text-gray-300">
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <Price
                        amount={totals?.subtotal.amount ?? 0}
                        currencyCode={totals?.subtotal.currencyCode ?? currencyCode}
                        className="text-white"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Taxes</span>
                      <Price
                        amount={totals?.tax.amount ?? 0}
                        currencyCode={totals?.tax.currencyCode ?? currencyCode}
                        className="text-white"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Shipping</span>
                      {totals?.shipping.amount ? (
                        <Price
                          amount={totals.shipping.amount}
                          currencyCode={totals.shipping.currencyCode}
                          className="text-white"
                        />
                      ) : (
                        <span className="text-xs text-gray-400">Calculated at checkout</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between border-t border-neutral-700 pt-2 text-base font-medium text-white">
                      <span>Total</span>
                      <Price
                        amount={totals?.total.amount ?? total}
                        currencyCode={totals?.total.currencyCode ?? currencyCode}
                        className="text-white"
                      />
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="mt-4 w-full bg-white text-black hover:bg-gray-100"
                    disabled={!hasItems}
                  >
                    <CartIcon className="mr-2 h-4 w-4" />
                    Checkout
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
