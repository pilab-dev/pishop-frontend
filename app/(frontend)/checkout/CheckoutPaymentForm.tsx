'use client'

import { Button } from '@/components/ui/button'
import { FancyTitle } from '@/components/fancy-title'
import { getStripe } from '@/lib/stripe'
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { CheckCircle, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface CheckoutPaymentFormProps {
  clientSecret: string | null
  paymentProcessing: boolean
  onBack: () => void
  onPlaceOrder: () => void | Promise<void>
}

function ComingSoonOption({ label, description, badge }: { label: string; description: string; badge: string }) {
  return (
    <label className="flex items-center space-x-3 p-4 border rounded-lg opacity-60 cursor-not-allowed">
      <input type="radio" name="paymentMethod" disabled className="text-primary" />
      <div className="flex-1">
        <div className="font-medium flex items-center gap-2">
          {label}
          <span className="text-xs font-normal px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
            Coming soon
          </span>
        </div>
        <div className="text-sm text-muted-foreground">{description}</div>
      </div>
      <div className="w-8 h-8 rounded-full flex items-center justify-center bg-muted text-muted-foreground font-bold text-sm">
        {badge}
      </div>
    </label>
  )
}

function StripeCardSection({
  paymentProcessing,
  onBack,
  onPlaceOrder,
}: Pick<CheckoutPaymentFormProps, 'paymentProcessing' | 'onBack' | 'onPlaceOrder'>) {
  const stripe = useStripe()
  const elements = useElements()
  const [confirming, setConfirming] = useState(false)
  const [stripeError, setStripeError] = useState<string | null>(null)

  const submitting = confirming || paymentProcessing

  const handleSubmit = async () => {
    if (!stripe || !elements) return

    setStripeError(null)
    setConfirming(true)
    try {
      const { error } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      })

      if (error) {
        setStripeError(error.message || 'Payment failed. Please check your card details and try again.')
        return
      }

      await onPlaceOrder()
    } finally {
      setConfirming(false)
    }
  }

  return (
    <div className="space-y-4">
      <PaymentElement />
      {stripeError && <p className="text-sm text-destructive">{stripeError}</p>}
      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} size="lg" disabled={submitting}>
          Back to Shipping
        </Button>
        <Button onClick={handleSubmit} disabled={!stripe || !elements || submitting} size="lg" className="min-w-[160px]">
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              Complete Order
              <CheckCircle className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export const CheckoutPaymentForm = ({
  clientSecret,
  paymentProcessing,
  onBack,
  onPlaceOrder,
}: CheckoutPaymentFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">
          <FancyTitle label="Payment Method" />
        </h3>
        <div className="grid grid-cols-1 gap-3">
          <div className="p-4 border rounded-lg bg-muted/30">
            <div className="flex items-center space-x-3 mb-4">
              <input type="radio" name="paymentMethod" checked readOnly className="text-primary" />
              <div className="flex-1">
                <div className="font-medium">Credit/Debit Card</div>
                <div className="text-sm text-muted-foreground">Pay securely with your card, powered by Stripe</div>
              </div>
            </div>

            {clientSecret ? (
              <Elements stripe={getStripe()} options={{ clientSecret }}>
                <StripeCardSection
                  paymentProcessing={paymentProcessing}
                  onBack={onBack}
                  onPlaceOrder={onPlaceOrder}
                />
              </Elements>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-center py-8 text-muted-foreground">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Preparing secure payment...
                </div>
                <div className="flex justify-start">
                  <Button variant="outline" onClick={onBack} size="lg">
                    Back to Shipping
                  </Button>
                </div>
              </div>
            )}
          </div>

          <ComingSoonOption label="Revolut Pay" description="Fast and secure payment with Revolut" badge="R" />
          <ComingSoonOption label="PayPal" description="Pay with your PayPal account" badge="P" />
        </div>
      </div>
    </div>
  )
}
