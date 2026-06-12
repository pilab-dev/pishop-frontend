import { Suspense } from 'react'
import { OrderConfirmationContent } from './OrderConfirmationContent'
import { OrderConfirmationLoading } from './OrderConfirmationLoading'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationLoading />}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
