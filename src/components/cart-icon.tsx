'use client'

import { useCartStore } from '@/store/cart-store'
import { useState } from 'react'
import { TfiShoppingCart } from 'react-icons/tfi'
import { useCartUI } from './cart/cart-context'
import { MobileCartDrawer } from './cart/mobile-drawer'
import CartModal from './cart/modal'
import { Badge } from './ui/badge'

export const CartIcon = () => {
  const { cart } = useCartStore()
  const { isMobileDrawerOpen, setIsMobileDrawerOpen } = useCartUI()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const itemCount = cart?.totals.itemCount || 0

  const handleClick = () => {
    // On mobile, open the drawer; on desktop, open the modal
    if (window.innerWidth < 640) {
      setIsMobileDrawerOpen(true)
    } else {
      setIsModalOpen(true)
    }
  }

  return (
    <>
      <button onClick={handleClick} className="relative focus:outline-none" aria-label="Open cart">
        <TfiShoppingCart fontSize={20} className="hover:text-primary transition-colors" />
        {itemCount > 0 && (
          <Badge
            variant="destructive"
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs font-bold animate-in zoom-in-50 duration-200"
          >
            {itemCount > 99 ? '99+' : itemCount}
          </Badge>
        )}
      </button>

      {/* Mobile Drawer */}
      <MobileCartDrawer isOpen={isMobileDrawerOpen} onClose={() => setIsMobileDrawerOpen(false)} />

      {/* Desktop Modal */}
      <CartModal isOpen={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}
