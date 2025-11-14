'use client'

import { Button } from '@/components/ui/button'
import { CheckCircle, CreditCard, Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import heavy components to reduce initial bundle size
const FloatingLabelInput = dynamic(
  () => import('@/components/ui/floating-label-input').then((mod) => mod.FloatingLabelInput),
  {
    loading: () => <div className="h-12 bg-gray-200 animate-pulse rounded" />,
  },
)

interface CheckoutPaymentFormProps {
  paymentMethod: string
  formErrors: Record<string, string>
  paymentProcessing: boolean
  onInputChange: (field: string, value: string) => void
  onBack: () => void
  onPlaceOrder: () => void
}

export const CheckoutPaymentForm = ({
  paymentMethod,
  formErrors,
  paymentProcessing,
  onInputChange,
  onBack,
  onPlaceOrder,
}: CheckoutPaymentFormProps) => {
  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Select Payment Method</h3>
        <div className="grid grid-cols-1 gap-3">
          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input
              type="radio"
              name="paymentMethod"
              value="stripe"
              checked={paymentMethod === 'stripe'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange('paymentMethod', e.target.value)
              }
              className="text-primary"
            />
            <div className="flex-1">
              <div className="font-medium">Credit/Debit Card (Stripe)</div>
              <div className="text-sm text-muted-foreground">
                Pay securely with your card
              </div>
            </div>
            <div className="flex space-x-1 text-muted-foreground">
              <div className="w-8 h-5 bg-blue-600 rounded text-xs text-white flex items-center justify-center font-bold">
                V
              </div>
              <div className="w-8 h-5 bg-red-600 rounded text-xs text-white flex items-center justify-center font-bold">
                M
              </div>
              <div className="w-8 h-5 bg-yellow-400 rounded text-xs text-black flex items-center justify-center font-bold">
                A
              </div>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input
              type="radio"
              name="paymentMethod"
              value="revolut"
              checked={paymentMethod === 'revolut'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange('paymentMethod', e.target.value)
              }
              className="text-primary"
            />
            <div className="flex-1">
              <div className="font-medium">Revolut Pay</div>
              <div className="text-sm text-muted-foreground">
                Fast and secure payment with Revolut
              </div>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
          </label>

          <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={paymentMethod === 'paypal'}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onInputChange('paymentMethod', e.target.value)
              }
              className="text-primary"
            />
            <div className="flex-1">
              <div className="font-medium">PayPal</div>
              <div className="text-sm text-muted-foreground">
                Pay with your PayPal account
              </div>
            </div>
            <div className="w-8 h-5 bg-blue-600 rounded text-xs text-white flex items-center justify-center font-bold">
              P
            </div>
          </label>
        </div>
        {formErrors.paymentMethod && (
          <p className="text-sm text-destructive">{formErrors.paymentMethod}</p>
        )}
      </div>

      {/* Credit Card Form - Only show for Stripe */}
      {paymentMethod === 'stripe' && (
        <div className="bg-muted/50 rounded-lg p-4">
          <p className="text-sm text-muted-foreground mb-4">
            Enter your card details to complete the payment.
          </p>
          <div className="space-y-4">
            <FloatingLabelInput
              id="cardNumber"
              label="Card Number"
              type="text"
              placeholder="1234 5678 9012 3456"
              icon={<CreditCard className="w-4 h-4" />}
              required
            />
            <div className="grid grid-cols-2 gap-4">
              <FloatingLabelInput
                id="expiry"
                label="Expiry Date"
                type="text"
                placeholder="MM/YY"
                required
              />
              <FloatingLabelInput
                id="cvv"
                label="CVV"
                type="text"
                placeholder="123"
                required
              />
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} size="lg">
          <CheckCircle className="w-4 h-4 mr-2" />
          Back to Shipping
        </Button>
        <Button
          onClick={onPlaceOrder}
          disabled={paymentProcessing}
          size="lg"
          className="min-w-[160px]"
        >
          {paymentProcessing ? (
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



