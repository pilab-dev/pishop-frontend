'use client'

import { useCartStore } from '@/store/cart-store'
import { TfiShoppingCart } from 'react-icons/tfi'
import { CartPopover } from './cart-popover'
import { MobileCartDrawer } from './cart/mobile-drawer'
import { AnimatedPopover } from './ui/animated-popover'
import { Badge } from './ui/badge'

interface CartIconProps {
  variant?: 'mobile' | 'desktop'
}

export const CartIcon = ({ variant = 'desktop' }: CartIconProps = {}) => {
  const { cart, isMobileDrawerOpen, setIsMobileDrawerOpen } = useCartStore()
  const itemCount = cart?.totals.itemCount || 0

  const handleClick = () => {
    // On mobile, open the drawer; on desktop, open the popover
    if (variant === 'mobile' || window.innerWidth < 640) {
      setIsMobileDrawerOpen(true)
    }
  }

  if (variant === 'mobile') {
    return (
      <>
        <button
          onClick={handleClick}
          className="relative focus:outline-none"
          aria-label="Open cart"
        >
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
        <MobileCartDrawer
          isOpen={isMobileDrawerOpen}
          onClose={() => setIsMobileDrawerOpen(false)}
        />
      </>
    )
  }

  // Desktop variant - use popover
  const trigger = (
    <button className="relative focus:outline-none" aria-label="Open cart">
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
  )

  return (
    <AnimatedPopover trigger={trigger} sideOffset={0} className="w-96 p-0">
      <CartPopover />
    </AnimatedPopover>
  )
}
