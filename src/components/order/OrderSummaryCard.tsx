import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FancyTitle } from '@/components/fancy-title'
import { formatCurrency } from '@/lib/formatCurrrency'
import type { Address, Order } from '@/lib/client/types'
import Image from 'next/image'

function formatAddress(address: Address) {
  const line2 = [address.address2, address.city, address.province, address.zip]
    .filter(Boolean)
    .join(', ')
  return { name: `${address.firstName} ${address.lastName}`.trim(), line1: address.address1, line2, country: address.country }
}

function AddressBlock({ title, address }: { title: string; address?: Address }) {
  if (!address) return null
  const formatted = formatAddress(address)
  return (
    <div>
      <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
      <p className="text-sm">{formatted.name}</p>
      <p className="text-sm text-muted-foreground">{formatted.line1}</p>
      <p className="text-sm text-muted-foreground">{formatted.line2}</p>
      <p className="text-sm text-muted-foreground">{formatted.country}</p>
    </div>
  )
}

export function OrderSummaryCard({ order }: { order: Order }) {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">
              <FancyTitle label={`Order #${order.orderNumber}`} />
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Placed on {new Date(order.createdAt).toLocaleDateString()}
            </p>
          </div>
          <Badge variant="secondary">{order.status.replace(/_/g, ' ')}</Badge>
        </CardHeader>
        <CardContent className="space-y-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              {item.product.images?.[0] && (
                <Image
                  src={item.product.images[0].url}
                  alt={item.product.images[0].altText || item.product.name}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{item.product.name}</p>
                <p className="text-sm text-muted-foreground">
                  Qty {item.quantity} &times; {formatCurrency(item.unitPrice.amount, item.unitPrice.currencyCode)}
                </p>
              </div>
              <p className="font-medium">
                {formatCurrency(item.totalPrice.amount, item.totalPrice.currencyCode)}
              </p>
            </div>
          ))}

          <Separator />

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(order.totals.subtotal.amount, order.totals.subtotal.currencyCode)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{formatCurrency(order.totals.shipping.amount, order.totals.shipping.currencyCode)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>{formatCurrency(order.totals.tax.amount, order.totals.tax.currencyCode)}</span>
            </div>
            {order.totals.discount.amount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Discount</span>
                <span>-{formatCurrency(order.totals.discount.amount, order.totals.discount.currencyCode)}</span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span>{formatCurrency(order.totals.total.amount, order.totals.total.currencyCode)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-bold">
            <FancyTitle label="Shipping & Payment" />
          </h2>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <AddressBlock title="Shipping address" address={order.shipping?.address} />
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">Shipping method</p>
            <p className="text-sm">{order.shipping?.method?.name || 'N/A'}</p>
            {order.shipping?.trackingNumber && (
              <p className="text-sm text-muted-foreground mt-1">
                Tracking #: {order.shipping.trackingNumber}
              </p>
            )}
            <p className="text-sm font-medium text-muted-foreground mt-4 mb-1">Payment</p>
            <p className="text-sm capitalize">
              {order.payment?.method?.name || order.payment?.method?.type || 'N/A'} &middot;{' '}
              {order.payment?.status?.toLowerCase() || 'unknown'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
