'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Cart } from '@/lib/client/types'
import { formatCurrency } from '@/lib/formatCurrrency'
import { CheckCircle, Loader2, ShoppingBag } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import heavy components to reduce initial bundle size
const Button = dynamic(() => import('@/components/ui/button').then((mod) => mod.Button), {
  loading: () => <div className="h-10 bg-gray-200 animate-pulse rounded" />,
})
const FloatingLabelInput = dynamic(
  () => import('@/components/ui/floating-label-input').then((mod) => mod.FloatingLabelInput),
  {
    loading: () => <div className="h-12 bg-gray-200 animate-pulse rounded" />,
  },
)

interface CheckoutOrderSummaryProps {
  cart: Cart | null
  couponCode: string
  couponLoading: boolean
  couponError: string | null
  onCouponCodeChange: (value: string) => void
  onApplyCoupon: () => void
  onRemoveCoupon: (couponId: string) => void
}

export const CheckoutOrderSummary = ({
  cart,
  couponCode,
  couponLoading,
  couponError,
  onCouponCodeChange,
  onApplyCoupon,
  onRemoveCoupon,
}: CheckoutOrderSummaryProps) => {
  return (
    <div className="lg:w-96">
      <Card className="sticky top-4">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <ShoppingBag className="w-5 h-5" />
            <span>Order Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Cart Items */}
          <div className="space-y-3">
            {cart?.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                  {item.product.images?.[0] ? (
                    <img
                      src={item.product.images[0].url}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{item.product.name}</p>
                  <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                </div>
                <p className="text-sm font-medium">${item.totalPrice.amount.toFixed(2)}</p>
              </div>
            ))}
          </div>

          <Separator />

          {/* Coupon Code Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Have a coupon?</h4>
            </div>
            <div className="flex space-x-2">
              <FloatingLabelInput
                id="couponCode"
                label="Coupon Code"
                type="text"
                value={couponCode}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onCouponCodeChange(e.target.value)
                }
                placeholder="Enter coupon code"
                className="flex-1"
                onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) =>
                  e.key === 'Enter' && onApplyCoupon()
                }
              />
              <Button
                onClick={onApplyCoupon}
                disabled={couponLoading || !couponCode.trim()}
                variant="outline"
                size="sm"
                className="min-w-[80px]"
              >
                {couponLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
              </Button>
            </div>
            {couponError && <p className="text-sm text-destructive">{couponError}</p>}
            {cart?.appliedCoupons && cart.appliedCoupons.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Applied Coupons:</p>
                {cart.appliedCoupons.map((coupon) => (
                  <div
                    key={coupon.id}
                    className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-2"
                  >
                    <div className="flex-1">
                      <p className="text-sm font-medium text-green-800">{coupon.couponCode}</p>
                      <p className="text-xs text-green-600">{coupon.description}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-green-800">
                        -${coupon.discountAmount.amount.toFixed(2)}
                      </span>
                      <Button
                        onClick={() => onRemoveCoupon(coupon.id)}
                        disabled={couponLoading}
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-green-600 hover:text-green-800 hover:bg-green-100"
                      >
                        <span className="sr-only">Remove coupon</span>×
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Separator />

          {/* Order Totals */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>
                {formatCurrency(
                  cart?.totals?.subtotal?.amount || 0,
                  cart?.totals?.subtotal?.currencyCode || 'HUF',
                )}
              </span>
            </div>
            {cart?.totals?.shipping && cart.totals.shipping.amount > 0 && (
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>
                  {formatCurrency(cart.totals.shipping.amount, cart.totals.shipping.currencyCode)}
                </span>
              </div>
            )}
            {cart?.totals?.tax && cart.totals.tax.amount > 0 && (
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>{formatCurrency(cart.totals.tax.amount, cart.totals.tax.currencyCode)}</span>
              </div>
            )}
            {cart?.totals?.discount && cart.totals.discount.amount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>
                  -{formatCurrency(cart.totals.discount.amount, cart.totals.discount.currencyCode)}
                </span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>
                {formatCurrency(
                  cart?.totals?.total?.amount || 0,
                  cart?.totals?.total?.currencyCode || 'HUF',
                )}
              </span>
            </div>
          </div>

          {/* Security Badge */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span className="text-sm text-green-800 font-medium">Secure Checkout</span>
            </div>
            <p className="text-xs text-green-700 mt-1">
              Your payment information is encrypted and secure.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
