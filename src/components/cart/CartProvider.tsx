'use client'

import { useCartStore } from '@/store/cart-store'
import { useEffect, useRef } from 'react'

export function CartProvider({ children }: { children: React.ReactNode }) {
  const initCart = useCartStore((state) => state.init)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      initCart()
    }
  }, [initCart])

  return <>{children}</>
}