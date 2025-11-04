import * as React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Textarea } from './textarea'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <Input
        ref={ref}
        className={cn(
          'peer',
          // Hide placeholder by default
          '[&::placeholder]:opacity-0 [&::placeholder]:pointer-events-none',
          // Show placeholder only when focused
          '[&::placeholder]:focus:opacity-100 [&::placeholder]:focus:pointer-events-auto',
          className,
        )}
        {...props}
      />
    )
  },
)

FloatingInput.displayName = 'FloatingInput'

const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return (
    <Label
      ref={ref}
      className={cn(
        'peer-focus:secondary peer-focus:dark:secondary absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2 text-sm text-gray-500 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 dark:bg-background rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 cursor-text',
        className,
      )}
      {...props}
    />
  )
})

FloatingLabel.displayName = 'FloatingLabel'

type FloatingLabelInputProps = InputProps & {
  label?: string
  icon?: React.ReactNode
  onIconClick?: () => void
}

const FloatingLabelInput = React.forwardRef<
  React.ElementRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, icon, onIconClick, className, ...props }, ref) => {
  return (
    <div className={cn('relative w-full', className)}>
      <FloatingInput ref={ref} id={id} {...props} />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
      {icon && (
        <button
          type="button"
          onClick={onIconClick}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors"
        >
          {icon}
        </button>
      )}
    </div>
  )
})

FloatingLabelInput.displayName = 'FloatingLabelInput'

type FloatingLabelTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  icon?: React.ReactNode
  onIconClick?: () => void
}

const FloatingTextarea = React.forwardRef<
  React.ElementRef<typeof Textarea>,
  React.PropsWithoutRef<FloatingLabelTextareaProps>
>(({ id, label, icon, onIconClick, className, ...props }, ref) => {
  return (
    <div className={cn('relative w-full', className)}>
      <Textarea
        ref={ref}
        id={id}
        className={cn(
          // Hide placeholder by default
          '[&::placeholder]:opacity-0 [&::placeholder]:pointer-events-none',
          // Show placeholder only when focused
          '[&::placeholder]:focus:opacity-100 [&::placeholder]:focus:pointer-events-auto',
        )}
        {...props}
      />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
      {icon && (
        <button
          type="button"
          onClick={onIconClick}
          className="absolute right-3 top-3 z-20 p-1 text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700 transition-colors"
        >
          {icon}
        </button>
      )}
    </div>
  )
})

FloatingTextarea.displayName = 'FloatingTextarea'

export { FloatingInput, FloatingLabel, FloatingLabelInput, FloatingTextarea }
