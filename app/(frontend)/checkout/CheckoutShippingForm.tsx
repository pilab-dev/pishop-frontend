'use client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import heavy components to reduce initial bundle size
const FloatingLabelInput = dynamic(
  () => import('@/components/ui/floating-label-input').then((mod) => mod.FloatingLabelInput),
  {
    loading: () => <div className="h-12 bg-gray-200 animate-pulse rounded" />,
  },
)
const FoxPostSelectCombobox = dynamic(
  () => import('@/components/ui/foxpost-select-combobox').then((mod) => mod.FoxPostSelectCombobox),
  {
    loading: () => <div className="h-12 bg-gray-200 animate-pulse rounded" />,
  },
)

interface ShippingAddress {
  address1: string
  address2?: string
  city: string
  province: string
  country: string
  zip: string
}

interface CheckoutFormData {
  shippingMethod: string
  shippingDestination?: string
  shippingAddress: ShippingAddress
}

interface CheckoutShippingFormProps {
  formData: CheckoutFormData
  formErrors: Record<string, string>
  onInputChange: (field: string, value: string) => void
  onAddressChange: (
    addressType: 'shippingAddress',
    field: string,
    value: string,
  ) => void
  onBack: () => void
  onNext: () => void
}

export const CheckoutShippingForm = ({
  formData,
  formErrors,
  onInputChange,
  onAddressChange,
  onBack,
  onNext,
}: CheckoutShippingFormProps) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Choose Shipping Method</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Parcel Box Services */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">
              Parcel Box Services
            </h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="foxpost"
                  checked={formData.shippingMethod === 'foxpost'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onInputChange('shippingMethod', e.target.value)
                  }
                  className="text-primary"
                />
                <div className="flex-1">
                  <div className="font-medium">FoxPost Parcel Box</div>
                  <div className="text-sm text-muted-foreground">
                    Pick up at any FoxPost location
                  </div>
                  <div className="text-sm font-medium text-green-600">Free</div>
                </div>
              </label>
              <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="gls"
                  checked={formData.shippingMethod === 'gls'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onInputChange('shippingMethod', e.target.value)
                  }
                  className="text-primary"
                />
                <div className="flex-1">
                  <div className="font-medium">GLS Parcel Box</div>
                  <div className="text-sm text-muted-foreground">
                    Pick up at any GLS location
                  </div>
                  <div className="text-sm font-medium text-green-600">Free</div>
                </div>
              </label>
            </div>
          </div>

          {/* Home Delivery Services */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-muted-foreground">
              Home Delivery
            </h4>
            <div className="space-y-2">
              <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="mpl"
                  checked={formData.shippingMethod === 'mpl'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onInputChange('shippingMethod', e.target.value)
                  }
                  className="text-primary"
                />
                <div className="flex-1">
                  <div className="font-medium">MPL Home Delivery</div>
                  <div className="text-sm text-muted-foreground">
                    Delivered to your door
                  </div>
                  <div className="text-sm font-medium">$4.99</div>
                </div>
              </label>
              <label className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-muted/50">
                <input
                  type="radio"
                  name="shippingMethod"
                  value="sameday"
                  checked={formData.shippingMethod === 'sameday'}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onInputChange('shippingMethod', e.target.value)
                  }
                  className="text-primary"
                />
                <div className="flex-1">
                  <div className="font-medium">Sameday Home Delivery</div>
                  <div className="text-sm text-muted-foreground">
                    Same-day delivery available
                  </div>
                  <div className="text-sm font-medium">$6.99</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Destination Selection for FoxPost */}
        {formData.shippingMethod === 'foxpost' && (
          <div className="space-y-3">
            <h4 className="font-medium">Select FoxPost Pickup Location</h4>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                FoxPost Location
              </label>
              <FoxPostSelectCombobox
                value={formData.shippingDestination || ''}
                onChange={(value: string) =>
                  onInputChange('shippingDestination', value)
                }
                placeholder="Search FoxPost pickup points..."
                className={formErrors.shippingDestination ? 'border-destructive' : ''}
              />
              {formErrors.shippingDestination && (
                <p className="text-sm text-destructive mt-1">
                  {formErrors.shippingDestination}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                Choose a convenient FoxPost pickup location for your order.
              </p>
            </div>
          </div>
        )}

        {/* Destination Selection for GLS */}
        {formData.shippingMethod === 'gls' && (
          <div className="space-y-3">
            <h4 className="font-medium">Select GLS Pickup Location</h4>
            <div className="space-y-2">
              <FloatingLabelInput
                id="shippingDestination"
                label="GLS Location"
                type="text"
                value={formData.shippingDestination || ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onInputChange('shippingDestination', e.target.value)
                }
                placeholder="Select from map or enter location code"
                required
                className={formErrors.shippingDestination ? 'border-destructive' : ''}
              />
              {formErrors.shippingDestination && (
                <p className="text-sm text-destructive mt-1">
                  {formErrors.shippingDestination}
                </p>
              )}
              <p className="text-sm text-muted-foreground">
                You can select a GLS pickup location after placing your order or
                choose one during checkout.
              </p>
            </div>
          </div>
        )}

        {/* Shipping Address for Home Delivery */}
        {(formData.shippingMethod === 'mpl' ||
          formData.shippingMethod === 'sameday') && (
          <div className="space-y-4">
            <Separator />
            <h4 className="text-lg font-semibold">Delivery Address</h4>
            <div className="space-y-4">
              <div>
                <FloatingLabelInput
                  id="shippingAddress1"
                  label="Address Line 1"
                  type="text"
                  value={formData.shippingAddress.address1}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    onAddressChange('shippingAddress', 'address1', e.target.value)
                  }
                  placeholder="123 Main Street"
                  icon={<MapPin className="w-4 h-4" />}
                  required
                  className={formErrors.shippingAddress1 ? 'border-destructive' : ''}
                />
                {formErrors.shippingAddress1 && (
                  <p className="text-sm text-destructive mt-1">
                    {formErrors.shippingAddress1}
                  </p>
                )}
              </div>
              <FloatingLabelInput
                id="shippingAddress2"
                label="Address Line 2 (Optional)"
                type="text"
                value={formData.shippingAddress.address2}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  onAddressChange('shippingAddress', 'address2', e.target.value)
                }
                placeholder="Apartment, suite, etc."
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <FloatingLabelInput
                    id="shippingCity"
                    label="City"
                    type="text"
                    value={formData.shippingAddress.city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onAddressChange('shippingAddress', 'city', e.target.value)
                    }
                    placeholder="New York"
                    required
                    className={formErrors.shippingCity ? 'border-destructive' : ''}
                  />
                  {formErrors.shippingCity && (
                    <p className="text-sm text-destructive mt-1">
                      {formErrors.shippingCity}
                    </p>
                  )}
                </div>
                <div>
                  <FloatingLabelInput
                    id="shippingProvince"
                    label="State/Province"
                    type="text"
                    value={formData.shippingAddress.province}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onAddressChange(
                        'shippingAddress',
                        'province',
                        e.target.value,
                      )
                    }
                    placeholder="NY"
                    required
                    className={
                      formErrors.shippingProvince ? 'border-destructive' : ''
                    }
                  />
                  {formErrors.shippingProvince && (
                    <p className="text-sm text-destructive mt-1">
                      {formErrors.shippingProvince}
                    </p>
                  )}
                </div>
                <div>
                  <FloatingLabelInput
                    id="shippingZip"
                    label="ZIP Code"
                    type="text"
                    value={formData.shippingAddress.zip}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onAddressChange('shippingAddress', 'zip', e.target.value)
                    }
                    placeholder="10001"
                    required
                    className={formErrors.shippingZip ? 'border-destructive' : ''}
                  />
                  {formErrors.shippingZip && (
                    <p className="text-sm text-destructive mt-1">
                      {formErrors.shippingZip}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack} size="lg">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Information
        </Button>
        <Button
          onClick={onNext}
          size="lg"
          className="min-w-[140px]"
        >
          Continue to Payment
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
