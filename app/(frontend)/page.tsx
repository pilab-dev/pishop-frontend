import { Suspense } from 'react'
import { HomeContent } from './HomeContent'
import { HomeLoading } from './HomeLoading'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function Home() {
  return (
    <Suspense fallback={<HomeLoading />}>
      <HomeContent />
    </Suspense>
  )
}
