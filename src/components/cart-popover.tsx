'use client'

import { formatCurrency } from '@/lib/formatCurrrency'
import { useCartStore } from '@/store/cart-store'
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

export const CartPopover = () => {
  const { cart, updateItemQuantity, removeFromCart, isLoading } = useCartStore()

  const items = cart?.items || []
  const totals = cart?.totals || {
    subtotal: { amount: 0, currencyCode: 'HUF' },
    tax: { amount: 0, currencyCode: 'HUF' },
    shipping: { amount: 0, currencyCode: 'HUF' },
    discount: { amount: 0, currencyCode: 'HUF' },
    total: { amount: 0, currencyCode: 'HUF' },
    itemCount: 0,
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else {
      updateItemQuantity(itemId, newQuantity)
    }
  }

  return (
    <div className="w-full max-h-[80vh] overflow-hidden bg-white p-5">
      {/* Content */}
      <div className="max-h-72 overflow-y-auto pr-2 custom-scrollbar">
        {items.length === 0 ? (
          <div className="py-6 text-center text-gray-500">
            <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Your cart is empty</p>
            <Link href="/collections">
              <Button variant="outline" size="sm" className="mt-3 rounded-none uppercase text-xs tracking-wider">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <ul className="space-y-4 mb-4">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 relative group pb-4 border-b border-gray-50 last:border-0 last:pb-0"
              >
                {/* Product Image */}
                <Link href={`/product/${item.product.slug}`} className="w-[90px] h-[90px] bg-gray-100 flex-shrink-0 border border-gray-200">
                  {item.product.images[0] && (
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      width={90}
                      height={90}
                      className="w-full h-full object-cover"
                    />
                  )}
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] text-gray-800 font-medium truncate mb-1">
                    {item.product.name}
                  </p>
                  <p className="text-[13px] text-gray-500 font-light">
                    {item.quantity} x <span className="font-semibold text-gray-800">{formatCurrency(item.unitPrice.amount, item.unitPrice.currencyCode)}</span>
                  </p>
                </div>

                {/* Delete button */}
                <button
                  className="text-gray-400 hover:text-red-500 transition-colors ml-2"
                  onClick={() => removeFromCart(item.id)}
                  disabled={isLoading}
                >
                  <Trash2 className="h-[14px] w-[14px]" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Totals & Actions */}
      {items.length > 0 && (
        <div className="pt-5 border-t border-gray-100 mt-2">
          <p className="flex justify-between items-center text-lg font-bold text-gray-900 mb-5">
            <span className="text-gray-500 text-[13px] font-normal uppercase">Total cost</span>
            {formatCurrency(totals.total.amount, totals.total.currencyCode)}
          </p>

          <div className="flex flex-col">
            <Link href="/cart" className="w-full">
              <button className="w-full py-3 border border-black text-black uppercase text-[11px] tracking-widest font-semibold hover:bg-black hover:text-white transition-colors">
                View Cart
              </button>
            </Link>
            <Link href="/checkout" className="w-full">
              <button className="w-full py-3 bg-black text-white uppercase text-[11px] tracking-widest font-semibold hover:bg-[#f5c615] hover:text-black transition-colors">
                Check out
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
