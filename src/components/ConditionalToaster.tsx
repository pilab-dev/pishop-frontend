'use client'

import { useCartUI } from '@/components/cart/cart-context'
import { Toaster } from 'sonner'

export function ConditionalToaster() {
  const { isMobileDrawerOpen } = useCartUI()
  return !isMobileDrawerOpen ? <Toaster position="bottom-right" richColors /> : null
}
