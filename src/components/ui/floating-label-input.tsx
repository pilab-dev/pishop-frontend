/**
 * @fileoverview Floating label input components with customizable placeholder behavior.
 *
 * This module provides a set of floating label input components that animate labels
 * based on focus state and placeholder visibility. The components support:
 *
 * - Floating labels that animate on focus/blur
 * - Optional icons with click handlers
 * - Customizable placeholder behavior via `placeholderClasses` prop
 * - Full accessibility support
 * - Dark mode and RTL support
 *
 * The default placeholder behavior hides placeholders by default and shows them
 * only when focused. This can be overridden by passing custom `placeholderClasses`.
 *
 * @example
 * ```tsx
 * import { FloatingLabelInput } from '@/components/ui/floating-label-input'
 *
 * // Basic usage
 * <FloatingLabelInput
 *   id="email"
 *   label="Email Address"
 *   type="email"
 *   placeholder="Enter your email"
 * />
 *
 * // With custom placeholder behavior (always show placeholders)
 * <FloatingLabelInput
 *   id="name"
 *   label="Full Name"
 *   placeholder="Enter your full name"
 *   placeholderClasses={[]} // No special placeholder classes
 * />
 *
 * // With icon
 * <FloatingLabelInput
 *   id="password"
 *   label="Password"
 *   type="password"
 *   icon={<EyeIcon />}
 *   onIconClick={toggleVisibility}
 * />
 * ```
 */

import * as React from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { Textarea } from './textarea'

// Types
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export interface FloatingLabelBaseProps {
  /** The label text to display */
  label?: string
  /** Optional icon to display on the right side */
  icon?: React.ReactNode
  /** Callback when the icon is clicked */
  onIconClick?: () => void
  /** Custom placeholder classes to override default floating behavior */
  placeholderClasses?: string[]
}

type FloatingLabelInputProps = InputProps & FloatingLabelBaseProps

type FloatingLabelTextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  FloatingLabelBaseProps

// Constants
const PLACEHOLDER_CLASSES = [
  // Hide placeholder by default
  '[&::placeholder]:opacity-0 [&::placeholder]:pointer-events-none',
  // Show placeholder only when focused
  '[&::placeholder]:focus:opacity-100 [&::placeholder]:focus:pointer-events-auto',
]

const FLOATING_LABEL_CLASSES = [
  // Base positioning and styling
  'absolute start-2 top-2 z-10 origin-[0] -translate-y-4 scale-75 transform bg-background px-2',
  'text-sm text-gray-500 duration-300 cursor-text',

  // Peer states
  'peer-focus:secondary peer-focus:dark:secondary',
  'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100',
  'peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2',

  // Dark mode and RTL support
  'dark:bg-background',
  'rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4',
]

const ICON_BUTTON_CLASSES = [
  'absolute z-20 p-1',
  'text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700',
  'transition-colors',
]

// Components
/**
 * Base input component with peer styling for floating labels.
 * Includes default placeholder behavior that can be overridden.
 */
const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return <Input ref={ref} className={cn('peer', PLACEHOLDER_CLASSES, className)} {...props} />
  },
)

FloatingInput.displayName = 'FloatingInput'

/**
 * Floating label component that animates based on input focus and placeholder state.
 * Uses peer CSS selectors to respond to the associated input's state.
 */
const FloatingLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  React.ComponentPropsWithoutRef<typeof Label>
>(({ className, ...props }, ref) => {
  return <Label ref={ref} className={cn(FLOATING_LABEL_CLASSES, className)} {...props} />
})

FloatingLabel.displayName = 'FloatingLabel'

/**
 * Input component with a floating label that animates on focus.
 * Supports optional icon with click handler and custom placeholder behavior.
 *
 * @example
 * ```tsx
 * <FloatingLabelInput
 *   id="email"
 *   label="Email Address"
 *   type="email"
 *   placeholder="Enter your email"
 *   icon={<MailIcon />}
 *   onIconClick={() => console.log('Icon clicked')}
 * />
 * ```
 */
const FloatingLabelInput = React.forwardRef<
  React.ElementRef<typeof FloatingInput>,
  React.PropsWithoutRef<FloatingLabelInputProps>
>(({ id, label, icon, onIconClick, placeholderClasses, className, ...props }, ref) => {
  const finalPlaceholderClasses = placeholderClasses || PLACEHOLDER_CLASSES

  return (
    <div className={cn('relative w-full', className)}>
      <FloatingInput ref={ref} id={id} className={cn(finalPlaceholderClasses)} {...props} />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
      {icon && (
        <button
          type="button"
          onClick={onIconClick}
          className={cn(ICON_BUTTON_CLASSES, 'right-3 top-1/2 -translate-y-1/2')}
        >
          {icon}
        </button>
      )}
    </div>
  )
})

FloatingLabelInput.displayName = 'FloatingLabelInput'

/**
 * Textarea component with a floating label that animates on focus.
 * Supports optional icon with click handler and custom placeholder behavior.
 *
 * @example
 * ```tsx
 * <FloatingTextarea
 *   id="message"
 *   label="Message"
 *   placeholder="Enter your message"
 *   rows={4}
 *   icon={<SendIcon />}
 *   onIconClick={() => console.log('Send clicked')}
 * />
 * ```
 */
const FloatingTextarea = React.forwardRef<
  React.ElementRef<typeof Textarea>,
  React.PropsWithoutRef<FloatingLabelTextareaProps>
>(({ id, label, icon, onIconClick, placeholderClasses, className, ...props }, ref) => {
  const finalPlaceholderClasses = placeholderClasses || PLACEHOLDER_CLASSES

  return (
    <div className={cn('relative w-full', className)}>
      <Textarea ref={ref} id={id} className={cn(finalPlaceholderClasses)} {...props} />
      <FloatingLabel htmlFor={id}>{label}</FloatingLabel>
      {icon && (
        <button
          type="button"
          onClick={onIconClick}
          className={cn(ICON_BUTTON_CLASSES, 'right-3 top-3')}
        >
          {icon}
        </button>
      )}
    </div>
  )
})

FloatingTextarea.displayName = 'FloatingTextarea'

export { FloatingInput, FloatingLabel, FloatingLabelInput, FloatingTextarea }
