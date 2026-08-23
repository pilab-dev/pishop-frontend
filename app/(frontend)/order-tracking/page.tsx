import { Suspense } from 'react'
import { OrderTrackingContent } from './OrderTrackingContent'
import { OrderTrackingLoading } from './OrderTrackingLoading'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function OrderTrackingPage() {
  return (
    <Suspense fallback={<OrderTrackingLoading />}>
      <OrderTrackingContent />
    </Suspense>
  )
}
