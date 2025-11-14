'use client'

import { Card, CardContent } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

interface CheckoutStepsProps {
  currentStep: number
}

export const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 1
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {currentStep > 1 ? <CheckCircle className="w-4 h-4" /> : '1'}
            </div>
            <span
              className={`text-sm font-medium ${currentStep >= 1 ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              Information
            </span>
          </div>
          <div className="flex-1 h-px bg-border mx-4" />
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 2
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {currentStep > 2 ? <CheckCircle className="w-4 h-4" /> : '2'}
            </div>
            <span
              className={`text-sm font-medium ${currentStep >= 2 ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              Shipping
            </span>
          </div>
          <div className="flex-1 h-px bg-border mx-4" />
          <div className="flex items-center space-x-2">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                currentStep >= 3
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              3
            </div>
            <span
              className={`text-sm font-medium ${currentStep >= 3 ? 'text-foreground' : 'text-muted-foreground'}`}
            >
              Payment
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}



