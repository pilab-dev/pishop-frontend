import { Suspense } from 'react'
import { LoginContent } from './LoginContent'
import { LoginLoading } from './LoginLoading'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  )
}
