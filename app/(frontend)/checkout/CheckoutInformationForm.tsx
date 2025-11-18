'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import heavy components to reduce initial bundle size
const FloatingLabelInput = dynamic(
  () => import('@/components/ui/floating-label-input').then((mod) => mod.FloatingLabelInput),
  {
    loading: () => <div className="h-12 bg-gray-200 animate-pulse rounded" />,
  },
)

interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  phone: string
}

interface CheckoutInformationFormProps {
  formData: CheckoutFormData
  formErrors: Record<string, string>
  onInputChange: (field: string, value: string) => void
  onNext: () => void
}

export const CheckoutInformationForm = ({
  formData,
  formErrors,
  onInputChange,
  onNext,
}: CheckoutInformationFormProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <FloatingLabelInput
            id="firstName"
            label="First Name"
            type="text"
            value={formData.firstName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange('firstName', e.target.value)
            }
            placeholder="John"
            required
            className={formErrors.firstName ? 'border-destructive' : ''}
          />
          {formErrors.firstName && (
            <p className="text-sm text-destructive mt-1">{formErrors.firstName}</p>
          )}
        </div>
        <div>
          <FloatingLabelInput
            id="lastName"
            label="Last Name"
            type="text"
            value={formData.lastName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onInputChange('lastName', e.target.value)
            }
            placeholder="Doe"
            required
            className={formErrors.lastName ? 'border-destructive' : ''}
          />
          {formErrors.lastName && (
            <p className="text-sm text-destructive mt-1">{formErrors.lastName}</p>
          )}
        </div>
      </div>
      <div>
        <FloatingLabelInput
          id="email"
          label="Email Address"
          type="email"
          value={formData.email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onInputChange('email', e.target.value)
          }
          placeholder="john@example.com"
          required
          className={formErrors.email ? 'border-destructive' : ''}
        />
        {formErrors.email && (
          <p className="text-sm text-destructive mt-1">{formErrors.email}</p>
        )}
      </div>
      <FloatingLabelInput
        id="phone"
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onInputChange('phone', e.target.value)
        }
        placeholder="+1 (555) 123-4567"
      />

      <div className="flex justify-end pt-4">
        <Button onClick={onNext} size="lg" className="min-w-[140px]">
          Continue to Shipping
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}




