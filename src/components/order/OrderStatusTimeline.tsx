import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FancyTitle } from '@/components/fancy-title'
import type { Order } from '@/lib/client/types'
import { Check, ExternalLink, Package } from 'lucide-react'

function formatStatus(status: string) {
  return status.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export function OrderStatusTimeline({ order }: { order: Order }) {
  const tracking = order.tracking
  const history = tracking?.history ?? []
  const currentStatus = tracking?.status || order.status

  return (
    <Card>
      <CardHeader>
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <Package className="w-4 h-4 text-primary" />
          <FancyTitle label={`Order Status: ${formatStatus(currentStatus)}`} />
        </h2>
      </CardHeader>
      <CardContent className="space-y-4">
        {history.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No detailed status history is available yet for this order.
          </p>
        ) : (
          <ol className="space-y-4">
            {history.map((entry, index) => {
              const isLatest = index === history.length - 1
              return (
                <li key={`${entry.status}-${entry.timestamp}`} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={`flex items-center justify-center w-6 h-6 rounded-full flex-shrink-0 ${
                        isLatest ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    {index < history.length - 1 && <span className="flex-1 w-px bg-border mt-1" />}
                  </div>
                  <div className="pb-4">
                    <p className={`text-sm font-medium ${isLatest ? '' : 'text-muted-foreground'}`}>
                      {formatStatus(entry.status)}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {new Date(entry.timestamp).toLocaleString()}
                    </p>
                    {entry.note && <p className="text-sm text-muted-foreground mt-1">{entry.note}</p>}
                  </div>
                </li>
              )
            })}
          </ol>
        )}

        {tracking?.trackingNumber && (
          <div className="pt-2 border-t text-sm">
            <span className="text-muted-foreground">Tracking number: </span>
            <span className="font-medium">{tracking.trackingNumber}</span>
            {tracking.trackingUrl && (
              <a
                href={tracking.trackingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 ml-3 text-primary hover:underline"
              >
                Track shipment
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        )}

        {tracking?.estimatedDelivery && (
          <p className="text-sm text-muted-foreground">
            Estimated delivery: {new Date(tracking.estimatedDelivery).toLocaleDateString()}
          </p>
        )}
      </CardContent>
    </Card>
  )
}
