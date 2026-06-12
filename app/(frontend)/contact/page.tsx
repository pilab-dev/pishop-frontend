import { Suspense } from 'react'
import { ContactContent } from './ContactContent'
import { ContactLoading } from './ContactLoading'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function ContactPage() {
  return (
    <Suspense fallback={<ContactLoading />}>
      <ContactContent />
    </Suspense>
  )
}
