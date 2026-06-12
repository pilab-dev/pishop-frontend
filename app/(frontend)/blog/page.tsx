import { Suspense } from 'react'
import { BlogContent } from './BlogContent'
import { BlogLoading } from './BlogLoading'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function BlogPage() {
  return (
    <Suspense fallback={<BlogLoading />}>
      <BlogContent />
    </Suspense>
  )
}
