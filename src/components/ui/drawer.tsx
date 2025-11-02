'use client'

import { useEffect, ReactNode } from 'react'
import { X } from 'lucide-react'
import { Button } from './button'
import { cn } from '@/lib/utils'

interface DrawerProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  side?: 'left' | 'right'
  width?: string
  className?: string
}

export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  side = 'right',
  width = 'w-full max-w-sm',
  className
}: DrawerProps) {
  // Close drawer on ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  const sideClasses = side === 'left'
    ? (isOpen ? 'translate-x-0' : '-translate-x-full')
    : (isOpen ? 'translate-x-0' : 'translate-x-full')

  const positionClasses = side === 'left' ? 'left-0' : 'right-0'

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 sm:hidden"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          'fixed top-0 z-50 h-full transform bg-black text-white transition-all duration-300 ease-in-out sm:hidden',
          positionClasses,
          width,
          sideClasses,
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none',
          className
        )}
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          {title && (
            <div className="flex items-center justify-between border-b border-neutral-700 p-4">
              <h2 className="text-lg font-semibold text-white">{title}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-8 w-8 text-white hover:bg-gray-800"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}
