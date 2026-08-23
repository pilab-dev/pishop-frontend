'use client'

import { BreadcrumbBar } from '@/components/products/breadcrumb-bar'
import { OrderStatusTimeline } from '@/components/order/OrderStatusTimeline'
import { OrderSummaryCard } from '@/components/order/OrderSummaryCard'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FancyTitle } from '@/components/fancy-title'
import { Input } from '@/components/ui/input'
import { client } from '@/lib/client'
import type { Order } from '@/lib/client/types'
import { Loader2, PackageSearch } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useState } from 'react'

export function OrderTrackingContent() {
  const searchParams = useSearchParams()

  const [orderNumber, setOrderNumber] = useState(searchParams.get('orderNumber') || '')
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState<Order | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!orderNumber.trim() || !email.trim()) return

    setLoading(true)
    setError(null)
    setOrder(null)

    try {
      const result = await client.getOrderByNumber(orderNumber.trim())
      if (result.customerEmail.trim().toLowerCase() !== email.trim().toLowerCase()) {
        setError('No order found matching that order number and email.')
        return
      }
      setOrder(result)
    } catch (err) {
      console.error('Failed to look up order:', err)
      setError('No order found matching that order number and email.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <BreadcrumbBar segments={[{ name: 'Track Order', href: '/order-tracking' }]} />
      <div className="container mx-auto p-4 py-8">
        <div className="max-w-md mx-auto mb-8">
          <div className="text-center mb-6">
            <PackageSearch className="w-10 h-10 mx-auto mb-3 text-muted-foreground" />
            <h1 className="text-2xl font-bold">Track Your Order</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Enter your order number and the email used at checkout.
            </p>
          </div>

          <Card>
            <CardHeader>
              <h2 className="text-lg font-bold">
                <FancyTitle label="Order Lookup" />
              </h2>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="orderNumber" className="text-sm font-medium">
                    Order number
                  </label>
                  <Input
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="e.g. ORD-000123"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                  />
                </div>
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Looking up...
                    </>
                  ) : (
                    'Track Order'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {order && (
          <div className="max-w-3xl mx-auto space-y-6">
            <OrderStatusTimeline order={order} />
            <OrderSummaryCard order={order} />
          </div>
        )}
      </div>
    </>
  )
}
