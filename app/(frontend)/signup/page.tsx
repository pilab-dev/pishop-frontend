import { Suspense } from 'react'
import { SignupContent } from './SignupContent'
import { SignupLoading } from './SignupLoading'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function SignupPage() {
  return (
    <Suspense fallback={<SignupLoading />}>
      <SignupContent />
    </Suspense>
  )
}
