import { formatCurrency } from '@/lib/formatCurrrency'

const Price = ({
  amount,
  className,
  currencyCode = 'HUF',
  currencyCodeClassName,
}: {
  amount: string | number
  className?: string
  currencyCode: string
  currencyCodeClassName?: string
} & React.ComponentProps<'p'>) => {
  // Ensure amount is a string or number that can be parsed
  if (typeof amount !== 'string' && typeof amount !== 'number') {
    console.warn('Invalid amount type. Expected string or number.')
    return null
  }

  // The formatCurrency function expects the amount in the smallest currency unit
  // (e.g., cents for USD, fillér for HUF), which is how the API returns it
  const amountValue = typeof amount === 'string' ? parseInt(amount, 10) : amount

  return (
    <p suppressHydrationWarning={true} className={className}>
      {formatCurrency(amountValue, currencyCode)}
    </p>
  )
}

export default Price
