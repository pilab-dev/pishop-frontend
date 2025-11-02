'use client'

import { createContext, useContext, ReactNode, useState } from 'react'

interface CartUIContextType {
  isMobileDrawerOpen: boolean
  setIsMobileDrawerOpen: (open: boolean) => void
}

const CartUIContext = createContext<CartUIContextType | undefined>(undefined)

export function useCartUI() {
  const context = useContext(CartUIContext)
  if (!context) {
    throw new Error('useCartUI must be used within a CartUIProvider')
  }
  return context
}

interface CartUIProviderProps {
  children: ReactNode
}

export function CartUIProvider({ children }: CartUIProviderProps) {
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false)

  return (
    <CartUIContext.Provider value={{ isMobileDrawerOpen, setIsMobileDrawerOpen }}>
      {children}
    </CartUIContext.Provider>
  )
}

