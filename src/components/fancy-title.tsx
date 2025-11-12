import { cn } from '@/lib/utils'
import type { FC } from 'react'

export interface FancyTitleProps {
  /** The text label to render, the first character gets highlighted. */
  label: string
  /** Optional additional class names for the wrapping span. */
  className?: string
}

/**
 * FancyTitle
 *
 * Highlights the first letter of a label with a primary color.
 * Useful for visually emphasizing section titles or headers.
 *
 * @param label - The string to render with the first character highlighted.
 * @param className - Optional additional Tailwind CSS classes for the wrapping span.
 *
 * @example
 * <FancyTitle label="Hot Deals" />
 * // Renders: <span> <span class="text-primary">H</span>ot Deals </span>
 */
export const FancyTitle: FC<FancyTitleProps> = ({ label, className }) => {
  if (!label || typeof label !== 'string' || label.length === 0) return null

  const firstChar = label[0]
  const rest = label.slice(1)

  return (
    <span className={cn('whitespace-nowrap', className)}>
      <span className="text-primary">{firstChar}</span>
      {rest}
    </span>
  )
}
