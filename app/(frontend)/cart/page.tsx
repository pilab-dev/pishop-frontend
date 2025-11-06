'use client'

import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { formatCurrency } from '@/lib/formatCurrrency'
import { useCartStore } from '@/store/cart-store'

const CartPage = () => {
  const { cart, isLoading, error, removeFromCart, updateItemQuantity, refresh, reset } =
    useCartStore()

  const items = cart?.items || []
  const total = cart?.totals?.total || { amount: 0, currencyCode: 'HUF' }

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      await removeFromCart(itemId)
    } else {
      await updateItemQuantity(itemId, newQuantity)
    }
  }

  const incrementQuantity = (itemId: string, currentQuantity: number) => {
    handleQuantityChange(itemId, currentQuantity + 1)
  }

  const decrementQuantity = (itemId: string, currentQuantity: number) => {
    handleQuantityChange(itemId, currentQuantity - 1)
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <div className="text-red-500 mb-4">
              <ShoppingCart className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="font-semibold">Error loading cart</p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <div className="flex gap-2 justify-center">
              <Button onClick={() => refresh()} variant="outline">
                Try Again
              </Button>
              <Button onClick={() => reset()} variant="destructive">
                Reset Cart
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isLoading || !cart) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <ShoppingCart className="w-12 h-12 mx-auto mb-4 animate-pulse text-muted-foreground" />
            <p className="text-lg font-medium">Loading your cart...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Shopping Cart</h1>
          {items.length > 0 && (
            <p className="text-muted-foreground">
              {items.length} {items.length === 1 ? 'item' : 'items'} in your cart
            </p>
          )}
        </div>

        {items.length === 0 ? (
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8 text-center">
              <ShoppingCart className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <CardTitle className="mb-2">Your cart is empty</CardTitle>
              <p className="text-muted-foreground mb-6">
                Add some products to get started with your shopping.
              </p>
              <Button asChild>
                <Link href="/">Continue Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {/* Cart Items */}
            <div className="space-y-4">
              {items.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      {item.product.images[0] && (
                        <div className="flex-shrink-0">
                          <img
                            src={item.product.images[0].url}
                            alt={item.product.images[0].altText || item.product.name}
                            className="w-20 h-20 object-cover rounded-md"
                          />
                        </div>
                      )}

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="text-lg font-semibold hover:text-primary transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-muted-foreground text-sm mt-1">
                          {formatCurrency(item.unitPrice.amount, item.unitPrice.currencyCode)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => decrementQuantity(item.id, item.quantity)}
                          disabled={isLoading}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(item.id, parseInt(e.target.value) || 1)
                          }
                          className="w-20 text-center"
                          disabled={isLoading}
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => incrementQuantity(item.id, item.quantity)}
                          disabled={isLoading}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Total Price */}
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(item.totalPrice.amount, item.totalPrice.currencyCode)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <div className="flex items-start">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.id)}
                          disabled={isLoading}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Cart Summary */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Cart Summary</CardTitle>
                <Button onClick={() => refresh()} variant="ghost" size="sm" disabled={isLoading}>
                  Refresh
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span>Subtotal ({items.length} items)</span>
                  <span>
                    {formatCurrency(
                      cart?.totals?.subtotal?.amount || 0,
                      cart?.totals?.subtotal?.currencyCode || 'HUF',
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Tax</span>
                  <span>
                    {formatCurrency(
                      cart?.totals?.tax?.amount || 0,
                      cart?.totals?.tax?.currencyCode || 'HUF',
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Shipping</span>
                  <span>
                    {formatCurrency(
                      cart?.totals?.shipping?.amount || 0,
                      cart?.totals?.shipping?.currencyCode || 'HUF',
                    )}
                  </span>
                </div>
                {cart?.totals?.discount?.amount && cart?.totals?.discount?.amount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>
                      -
                      {formatCurrency(
                        cart?.totals?.discount?.amount || 0,
                        cart?.totals?.discount?.currencyCode || 'HUF',
                      )}
                    </span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(total.amount, total.currencyCode)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild className="w-full" size="lg">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
