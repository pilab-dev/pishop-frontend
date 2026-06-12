import { Suspense } from 'react'
import { CheckoutContent } from './CheckoutContent'
import { CheckoutLoading } from './CheckoutLoading'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  )
}
