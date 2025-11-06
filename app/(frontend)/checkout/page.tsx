'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { client } from '@/lib/client'
import { CheckoutSession } from '@/lib/client/types'
import { useCartStore } from '@/store/cart-store'
import { CreditCard, MapPin, Truck } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CheckoutEmptyCart } from './CheckoutEmptyCart'
import { CheckoutInformationForm } from './CheckoutInformationForm'
import { CheckoutLoading } from './CheckoutLoading'
import { CheckoutOrderSummary } from './CheckoutOrderSummary'
import { CheckoutPaymentForm } from './CheckoutPaymentForm'
import { CheckoutShippingForm } from './CheckoutShippingForm'
import { CheckoutSteps } from './CheckoutSteps'

interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  phone: string
  shippingMethod: string
  shippingDestination?: string
  paymentMethod: string
  shippingAddress: {
    address1: string
    address2?: string
    city: string
    province: string
    country: string
    zip: string
  }
  billingAddress: {
    address1: string
    address2?: string
    city: string
    province: string
    country: string
    zip: string
  }
}

const CheckoutPage = () => {
  const { cart, isLoading, error, init, refresh, setShippingMethod } = useCartStore()
  const router = useRouter()

  const [currentStep, setCurrentStep] = useState(1) // 1: Information, 2: Shipping, 3: Payment
  const [checkoutSession, setCheckoutSession] = useState<CheckoutSession | null>(null)
  const [loadingSession, setLoadingSession] = useState(false)
  const [paymentProcessing, setPaymentProcessing] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [couponLoading, setCouponLoading] = useState(false)
  const [couponError, setCouponError] = useState<string | null>(null)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    shippingMethod: 'foxpost',
    shippingDestination: '',
    paymentMethod: 'stripe',
    shippingAddress: {
      address1: '',
      address2: '',
      city: '',
      province: '',
      country: 'HU',
      zip: '',
    },
    billingAddress: {
      address1: '',
      address2: '',
      city: '',
      province: '',
      country: 'HU',
      zip: '',
    },
  })

  useEffect(() => {
    // Try to initialize cart, but handle failures gracefully
    init().catch((error) => {
      console.warn('Cart initialization failed:', error)
      setCheckoutError(
        'Cart service is currently unavailable. Some features may not work properly.',
      )
    })
  }, [init])

  // Update shipping method when it changes
  useEffect(() => {
    if (cart && formData.shippingMethod) {
      const updateShipping = async () => {
        try {
          let destination = {}
          // Set destination based on shipping method type
          if (
            (formData.shippingMethod === 'foxpost' || formData.shippingMethod === 'gls') &&
            formData.shippingDestination
          ) {
            // For parcel boxes, use parcelBox destination
            destination = {
              parcelBox: { id: formData.shippingDestination },
            }
          } else if (formData.shippingMethod === 'mpl' || formData.shippingMethod === 'sameday') {
            // For home delivery, use address destination
            destination = {
              address: {
                address: formData.shippingAddress,
                contactName: `${formData.firstName} ${formData.lastName}`.trim(),
              },
            }
          }
          await setShippingMethod(formData.shippingMethod, destination)
        } catch (error) {
          console.error('Failed to update shipping method:', error)
        }
      }
      updateShipping()
    }
  }, [
    formData.shippingMethod,
    formData.shippingDestination,
    formData.shippingAddress,
    formData.firstName,
    formData.lastName,
    cart,
    setShippingMethod,
  ])

  // Checkout session will be created in the final step

  const validateAllInfo = () => {
    const errors: Record<string, string> = {}

    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Please enter a valid email'

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validateShippingInfo = () => {
    const errors: Record<string, string> = {}

    if (
      (formData.shippingMethod === 'foxpost' || formData.shippingMethod === 'gls') &&
      !formData.shippingDestination?.trim()
    ) {
      errors.shippingDestination = 'Pickup location is required for parcel box services'
    }

    // Validate shipping address for home delivery methods
    if (formData.shippingMethod === 'mpl' || formData.shippingMethod === 'sameday') {
      if (!formData.shippingAddress.address1.trim()) errors.shippingAddress1 = 'Address is required'
      if (!formData.shippingAddress.city.trim()) errors.shippingCity = 'City is required'
      if (!formData.shippingAddress.province.trim())
        errors.shippingProvince = 'State/Province is required'
      if (!formData.shippingAddress.zip.trim()) errors.shippingZip = 'ZIP code is required'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const validatePaymentInfo = () => {
    const errors: Record<string, string> = {}

    if (!formData.paymentMethod) {
      errors.paymentMethod = 'Please select a payment method'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Removed updateCustomerInfo and updateShippingInfo - now everything happens in handlePlaceOrder

  const handlePlaceOrder = async () => {
    if (!cart) {
      alert('Cart not available. Please refresh the page.')
      return
    }

    if (!validateAllInfo()) {
      setCurrentStep(1) // Go back to information step if validation fails
      return
    }

    if (!validateShippingInfo()) {
      setCurrentStep(2) // Go back to shipping step if validation fails
      return
    }

    if (!validatePaymentInfo()) {
      setCurrentStep(3) // Stay on payment step if validation fails
      return
    }

    setPaymentProcessing(true)
    try {
      // Create checkout session with all customer and shipping data
      const customerData = {
        email: formData.email.trim(),
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        phone: formData.phone.trim() || undefined,
        isGuest: true,
        shippingAddress: {
          ...formData.shippingAddress,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
        },
        billingAddress: {
          ...formData.billingAddress,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
        },
      }

      const shippingData = {
        methodId: formData.shippingMethod,
        destination: formData.shippingDestination,
        address: {
          ...formData.shippingAddress,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
        },
      }

      console.log('Creating checkout with customer data:', customerData)
      console.log('Creating checkout with shipping data:', shippingData)

      const checkoutSession = await client.createCheckout(cart.id, customerData, shippingData)

      // Process payment
      const updatedSession = await client.processPayment(checkoutSession.id, formData.paymentMethod)

      if (updatedSession.status === 'PAYMENT_SUCCEEDED') {
        const order = await client.createOrder(checkoutSession.id)
        router.push(`/order-confirmation?order_id=${order.id}`)
      } else {
        alert('Payment failed. Please try again.')
      }
    } catch (error) {
      console.error('Error processing payment:', error)
      alert('An error occurred while processing your payment. Please try again.')
    } finally {
      setPaymentProcessing(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAddressChange = (
    addressType: 'shippingAddress' | 'billingAddress',
    field: string,
    value: string,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [addressType]: {
        ...prev[addressType],
        [field]: value,
      },
    }))
  }

  const applyCoupon = async () => {
    if (!couponCode.trim() || !cart) return

    setCouponLoading(true)
    setCouponError(null)

    try {
      const updatedCart = await client.applyCoupon(couponCode.trim())
      refresh() // Refresh cart store
      setCouponCode('')
      // Update checkout session if it exists
      if (checkoutSession) {
        try {
          const updatedSession = await client.createCheckout(updatedCart.id)
          setCheckoutSession(updatedSession)
        } catch (error) {
          console.error('Error updating checkout session after coupon:', error)
          setCheckoutError('Failed to update checkout session after applying coupon')
        }
      }
    } catch (error) {
      console.error('Error applying coupon:', error)
      setCouponError(error instanceof Error ? error.message : 'Invalid or expired coupon code')
    } finally {
      setCouponLoading(false)
    }
  }

  const removeCoupon = async (couponId: string) => {
    if (!cart) return

    setCouponLoading(true)
    setCouponError(null)

    try {
      const updatedCart = await client.removeCoupon(couponId)
      refresh() // Refresh cart store
      // Update checkout session if it exists
      if (checkoutSession) {
        try {
          const updatedSession = await client.createCheckout(updatedCart.id)
          setCheckoutSession(updatedSession)
        } catch (error) {
          console.error('Error updating checkout session after removing coupon:', error)
          setCheckoutError('Failed to update checkout session after removing coupon')
        }
      }
    } catch (error) {
      console.error('Error removing coupon:', error)
      setCouponError(error instanceof Error ? error.message : 'Failed to remove coupon')
    } finally {
      setCouponLoading(false)
    }
  }

  if (isLoading && !cart) {
    return <CheckoutLoading />
  }

  if (!cart || cart.items.length === 0) {
    return <CheckoutEmptyCart />
  }

  // Cart totals are managed by the backend and updated when shipping method changes

  return (
    <div className="max-w-7xl mx-auto p-4 py-8 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="flex-1 space-y-6">
          {/* Header */}
          <div className="text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight mb-2">Checkout</h1>
            <p className="text-muted-foreground">Complete your order securely</p>
          </div>

          {/* Checkout Error Display */}
          {checkoutError && (
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="p-4">
                <p className="text-sm text-destructive">{checkoutError}</p>
              </CardContent>
            </Card>
          )}

          {/* Step Indicator */}
          <CheckoutSteps currentStep={currentStep} />

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {currentStep === 1 && (
                  <>
                    <MapPin className="w-5 h-5" />
                    <span>Contact Information</span>
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <Truck className="w-5 h-5" />
                    <span>Shipping Method & Destination</span>
                  </>
                )}
                {currentStep === 3 && (
                  <>
                    <CreditCard className="w-5 h-5" />
                    <span>Payment Details</span>
                  </>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative overflow-hidden min-h-[400px]">
              {/* Information Step */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  currentStep === 1
                    ? 'opacity-100 transform translate-x-0'
                    : 'opacity-0 transform -translate-x-4 pointer-events-none absolute inset-0'
                }`}
              >
                {currentStep === 1 && (
                  <CheckoutInformationForm
                    formData={{
                      email: formData.email,
                      firstName: formData.firstName,
                      lastName: formData.lastName,
                      phone: formData.phone,
                    }}
                    formErrors={formErrors}
                    onInputChange={handleInputChange}
                    onNext={() => setCurrentStep(2)}
                  />
                )}
              </div>

              {/* Shipping Step */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  currentStep === 2
                    ? 'opacity-100 transform translate-x-0'
                    : currentStep > 2
                      ? 'opacity-0 transform -translate-x-4 pointer-events-none absolute inset-0'
                      : 'opacity-0 transform translate-x-4 pointer-events-none absolute inset-0'
                }`}
              >
                {currentStep === 2 && (
                  <CheckoutShippingForm
                    formData={{
                      shippingMethod: formData.shippingMethod,
                      shippingDestination: formData.shippingDestination,
                      shippingAddress: formData.shippingAddress,
                    }}
                    formErrors={formErrors}
                    onInputChange={handleInputChange}
                    onAddressChange={handleAddressChange}
                    onBack={() => setCurrentStep(1)}
                    onNext={() => {
                      if (validateShippingInfo()) {
                        setCurrentStep(3)
                      }
                    }}
                  />
                )}
              </div>

              {/* Payment Step */}
              <div
                className={`transition-all duration-500 ease-in-out ${
                  currentStep === 3
                    ? 'opacity-100 transform translate-x-0'
                    : 'opacity-0 transform translate-x-4 pointer-events-none absolute inset-0'
                }`}
              >
                {currentStep === 3 && (
                  <CheckoutPaymentForm
                    paymentMethod={formData.paymentMethod}
                    formErrors={formErrors}
                    paymentProcessing={paymentProcessing}
                    onInputChange={handleInputChange}
                    onBack={() => setCurrentStep(2)}
                    onPlaceOrder={handlePlaceOrder}
                  />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <CheckoutOrderSummary
          cart={cart}
          couponCode={couponCode}
          couponLoading={couponLoading}
          couponError={couponError}
          onCouponCodeChange={setCouponCode}
          onApplyCoupon={applyCoupon}
          onRemoveCoupon={removeCoupon}
        />
      </div>
    </div>
  )
}

export default CheckoutPage
