'use client'

import { useAuthStore } from '@/store/auth-store'
import { useEffect, useRef } from 'react'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initAuth = useAuthStore((state) => state.init)
  const hasInitialized = useRef(false)

  useEffect(() => {
    if (!hasInitialized.current) {
      hasInitialized.current = true
      initAuth()
    }
  }, [initAuth])

  return <>{children}</>
}

