import { Suspense } from 'react'
import { AboutContent } from './AboutContent'
import { AboutLoading } from './AboutLoading'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function AboutPage() {
  return (
    <Suspense fallback={<AboutLoading />}>
      <AboutContent />
    </Suspense>
  )
}
