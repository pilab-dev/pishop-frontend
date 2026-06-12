import { Suspense } from 'react'
import { DocsContent } from './DocsContent'
import { DocsLoading } from './DocsLoading'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function DocsPage() {
  return (
    <Suspense fallback={<DocsLoading />}>
      <DocsContent />
    </Suspense>
  )
}