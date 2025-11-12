'use client'

import { animated, config, useTransition } from '@react-spring/web'
import { ReactNode, useState } from 'react'
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from './popover'

interface AnimatedPopoverProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'start' | 'center' | 'end'
  side?: 'top' | 'right' | 'bottom' | 'left'
  sideOffset?: number
  className?: string
  arrowClassName?: string
}

export const AnimatedPopover = ({
  trigger,
  children,
  align = 'end',
  side = 'bottom',
  sideOffset = 10,
  className = 'w-96 p-0 shadow-xl border border-black',
  arrowClassName = 'fill-white relative -top-px h-2 w-4',
}: AnimatedPopoverProps) => {
  const [open, setOpen] = useState(false)

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
              <PopoverArrow className={arrowClassName} />
              <div className="bg-white rounded-lg">{children}</div>
            </animated.div>
          </PopoverContent>
        ) : null,
      )}
    </Popover>
  )
}
