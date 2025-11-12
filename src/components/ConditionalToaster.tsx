'use client'

import { useCartStore } from '@/store/cart-store'
import { Toaster } from 'sonner'

export function ConditionalToaster() {
  const { isMobileDrawerOpen } = useCartStore()
  return !isMobileDrawerOpen ? <Toaster position="bottom-right" richColors /> : null
}
