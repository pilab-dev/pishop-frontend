'use client'

import { useCartStore } from '@/store/cart-store'
import { useState } from 'react'
import { TfiShoppingCart } from 'react-icons/tfi'
import { CartPopover } from './cart-popover'
import { useCartUI } from './cart/cart-context'
import { MobileCartDrawer } from './cart/mobile-drawer'
import { Badge } from './ui/badge'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

interface CartIconProps {
  variant?: 'mobile' | 'desktop'
}

export const CartIcon = ({ variant = 'desktop' }: CartIconProps = {}) => {
  const { cart } = useCartStore()
  const { isMobileDrawerOpen, setIsMobileDrawerOpen } = useCartUI()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const itemCount = cart?.totals.itemCount || 0

  const handleClick = () => {
    // On mobile, open the drawer; on desktop, open the popover
    if (variant === 'mobile' || window.innerWidth < 640) {
      setIsMobileDrawerOpen(true)
    } else {
      setIsPopoverOpen(true)
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
  return (
    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
      <PopoverTrigger asChild>
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
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="end" side="bottom" sideOffset={0}>
        <CartPopover />
      </PopoverContent>
    </Popover>
  )
}
