'use client'

import { animated, config, useTransition } from '@react-spring/web'
import { ReactNode, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'

interface AnimatedPopoverProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  className?: string
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export const AnimatedPopover = ({
  trigger,
  children,
  align = 'end',
  side = 'bottom',
  sideOffset = 10,
  className = 'w-80 p-0 rounded-none border border-gray-200 shadow-none',
  open: controlledOpen,
  onOpenChange,
}: AnimatedPopoverProps) => {
  const [internalOpen, setInternalOpen] = useState(false)
  const open = controlledOpen ?? internalOpen
  const setOpen = onOpenChange ?? setInternalOpen

  const transitions = useTransition(open, {
    from: { opacity: 0, transform: 'translateY(-10px) scale(0.95)' },
    enter: { opacity: 1, transform: 'translateY(0px) scale(1)' },
    leave: { opacity: 0, transform: 'translateY(10px) scale(0.95)' },
    config: config.stiff,
  })

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      {transitions((styles, item) =>
        item ? (
          <PopoverContent
            forceMount
            align={align}
            className={className}
            side={side}
            sideOffset={sideOffset}
            asChild
          >
            <animated.div style={styles}>
              <div className="bg-white">{children}</div>
            </animated.div>
          </PopoverContent>
        ) : null,
      )}
    </Popover>
  )
}
