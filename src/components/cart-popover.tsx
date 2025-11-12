'use client'

import { formatCurrency } from '@/lib/formatCurrrency'
import { useCartStore } from '@/store/cart-store'
import Link from 'next/link'
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react'
import { Button } from './ui/button'
import Image from 'next/image'

export const CartPopover = () => {
  const { cart, updateItemQuantity, removeFromCart, isLoading } = useCartStore()

  const items = cart?.items || []
  const totals = cart?.totals || {
    subtotal: { amount: 0, currencyCode: 'HUF' },
    tax: { amount: 0, currencyCode: 'HUF' },
    shipping: { amount: 0, currencyCode: 'HUF' },
    discount: { amount: 0, currencyCode: 'HUF' },
    total: { amount: 0, currencyCode: 'HUF' },
    itemCount: 0
  }

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(itemId)
    } else {
      updateItemQuantity(itemId, newQuantity)
    }
  }

  return (
    <div className="w-full max-h-[60vh] overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <ShoppingBag className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-gray-900">Your Cart</h3>
        <span className="ml-auto text-sm text-gray-600">({totals.itemCount} items)</span>
      </div>

      {/* Content */}
      <div className="max-h-64 overflow-y-auto">
        {items.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <ShoppingBag className="h-12 w-12 mx-auto mb-3 opacity-50" />
            <p className="text-sm">Your cart is empty</p>
            <Link href="/collections">
              <Button variant="outline" size="sm" className="mt-3">
                Start Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                {/* Product Image */}
                <div className="w-12 h-12 bg-gray-200 rounded-md flex-shrink-0 overflow-hidden">
                  {item.product.images[0] && (
                    <Image
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {item.product.name}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">
                    {formatCurrency(item.unitPrice.amount, item.unitPrice.currencyCode)} each
                  </p>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={isLoading}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium min-w-[2rem] text-center">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      disabled={isLoading}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 ml-2"
                      onClick={() => removeFromCart(item.id)}
                      disabled={isLoading}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                {/* Item Total */}
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {formatCurrency(item.totalPrice.amount, item.totalPrice.currencyCode)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Totals & Actions */}
      {items.length > 0 && (
        <div className="bg-gray-50">
          {/* Detailed Totals */}
          <div className="p-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span>{formatCurrency(totals.subtotal.amount, totals.subtotal.currencyCode)}</span>
            </div>
            {totals.shipping.amount > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span>{formatCurrency(totals.shipping.amount, totals.shipping.currencyCode)}</span>
              </div>
            )}
            {totals.tax.amount > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Tax:</span>
                <span>{formatCurrency(totals.tax.amount, totals.tax.currencyCode)}</span>
              </div>
            )}
            {totals.discount.amount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount:</span>
                <span>-{formatCurrency(totals.discount.amount, totals.discount.currencyCode)}</span>
              </div>
            )}
            <div className="pt-2 mt-3 flex justify-between font-semibold text-gray-900">
              <span>Total:</span>
              <span>{formatCurrency(totals.total.amount, totals.total.currencyCode)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-4 pt-0 space-y-2">
            <Link href="/cart">
              <Button className="w-full" size="sm">
                View Cart
              </Button>
            </Link>
            <Link href="/checkout">
              <Button variant="outline" className="w-full" size="sm">
                Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
