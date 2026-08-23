'use client'

import { BreadcrumbBar } from '@/components/products/breadcrumb-bar'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { OrderSummaryCard } from '@/components/order/OrderSummaryCard'
import { OrderStatusTimeline } from '@/components/order/OrderStatusTimeline'
import { client } from '@/lib/client'
import type { Order } from '@/lib/client/types'
import { CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { OrderConfirmationLoading } from './OrderConfirmationLoading'

export function OrderConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')

  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!orderId) {
      setLoading(false)
      setError('No order was specified.')
      return
    }

    let cancelled = false
    setLoading(true)
    setError(null)

    client
      .getOrder(orderId)
      .then((result) => {
        if (!cancelled) setOrder(result)
      })
      .catch((err) => {
        if (!cancelled) {
          console.error('Failed to load order:', err)
          setError(err instanceof Error ? err.message : 'Failed to load order')
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [orderId])

  const breadcrumb = (
    <BreadcrumbBar
      segments={[
        { name: 'Cart', href: '/cart' },
        { name: 'Checkout', href: '/checkout' },
        { name: 'Order Confirmation', href: '/order-confirmation' },
      ]}
    />
  )

  if (loading) {
    return <OrderConfirmationLoading />
  }

  if (error || !order) {
    return (
      <>
        {breadcrumb}
        <div className="container mx-auto p-4 py-16 text-center">
          <Card className="max-w-md mx-auto">
            <CardContent className="p-8">
              <p className="font-semibold mb-2">We couldn&apos;t find that order</p>
              <p className="text-sm text-muted-foreground mb-6">
                {error || 'The order may no longer exist or the link is incorrect.'}
              </p>
              <div className="flex flex-col gap-2">
                <Button asChild>
                  <Link href="/order-tracking">Track an order</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/">Continue Shopping</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  return (
    <>
      {breadcrumb}
      <div className="max-w-3xl mx-auto p-4 py-8">
        <div className="text-center mb-8">
          <CheckCircle2 className="w-14 h-14 text-green-600 mx-auto mb-4" />
          <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
          <p className="text-muted-foreground">
            Thank you for your purchase. A confirmation has been sent to {order.customerEmail}.
          </p>
        </div>

        <div className="space-y-6">
          <OrderStatusTimeline order={order} />
          <OrderSummaryCard order={order} />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Button asChild variant="outline">
            <Link href={`/order-tracking?orderNumber=${encodeURIComponent(order.orderNumber)}`}>
              Track this order
            </Link>
          </Button>
          <Button asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
