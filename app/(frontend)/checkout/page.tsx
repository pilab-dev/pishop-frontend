'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FloatingLabelInput } from '@/components/ui/floating-label-input'
import { Separator } from '@/components/ui/separator'
import { client } from '@/lib/client'
import { CheckoutSession } from '@/lib/client/types'
import { useCartStore } from '@/store/cart-store'
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CreditCard,
  Loader2,
  MapPin,
  ShoppingBag,
  Truck,
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface CheckoutFormData {
  email: string
  firstName: string
  lastName: string
  phone: string
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
  const { cart, isLoading, error, init, refresh } = useCartStore()
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
    shippingAddress: {
      address1: '',
      address2: '',
      city: '',
      province: '',
      country: 'US',
      zip: '',
    },
    billingAddress: {
      address1: '',
      address2: '',
      city: '',
      province: '',
      country: 'US',
      zip: '',
    },
  })

  useEffect(() => {
    init()
  }, [init])

  const createCheckoutSession = async () => {
    if (!cart) return

    setLoadingSession(true)
    setCheckoutError(null)
    try {
      const session = await client.createCheckout(cart.id)
      setCheckoutSession(session)
      console.log('Created checkout session:', session.id)
    } catch (error) {
      console.error('Error creating checkout session:', error)
      const errorMessage =
        error instanceof Error ? error.message : 'Failed to create checkout session'
      setCheckoutError(errorMessage)
    } finally {
      setLoadingSession(false)
    }
  }

  useEffect(() => {
    if (cart && cart.items.length > 0 && !checkoutSession && !loadingSession) {
      createCheckoutSession()
    }
  }, [cart, checkoutSession, loadingSession])

  const validateCustomerInfo = () => {
    const errors: Record<string, string> = {}

    if (!formData.firstName.trim()) errors.firstName = 'First name is required'
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required'
    if (!formData.email.trim()) errors.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Please enter a valid email'
    if (!formData.shippingAddress.address1.trim()) errors.shippingAddress1 = 'Address is required'
    if (!formData.shippingAddress.city.trim()) errors.shippingCity = 'City is required'
    if (!formData.shippingAddress.province.trim())
      errors.shippingProvince = 'State/Province is required'
    if (!formData.shippingAddress.zip.trim()) errors.shippingZip = 'ZIP code is required'

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const updateCustomerInfo = async () => {
    if (!checkoutSession) return

    if (!validateCustomerInfo()) {
      return
    }

    try {
      const updatedSession = await client.updateCheckoutCustomer(checkoutSession.id, {
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        isGuest: true,
        shippingAddress: {
          ...formData.shippingAddress,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
        billingAddress: {
          ...formData.billingAddress,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      })
      setCheckoutSession(updatedSession)
      setCurrentStep(2)
    } catch (error) {
      console.error('Error updating customer info:', error)
      alert('Failed to update customer information. Please try again.')
    }
  }

  const updateShippingInfo = async () => {
    if (!checkoutSession) return

    try {
      const updatedSession = await client.updateCheckoutShipping(checkoutSession.id, {
        methodId: checkoutSession.shipping?.method?.id || 'standard',
        address: {
          ...formData.shippingAddress,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      })
      setCheckoutSession(updatedSession)
      setCurrentStep(3)
    } catch (error) {
      console.error('Error updating shipping info:', error)
      alert('Failed to update shipping information. Please try again.')
    }
  }

  const handlePlaceOrder = async () => {
    if (!checkoutSession) return

    setPaymentProcessing(true)
    try {
      // For demo purposes, we'll simulate payment processing
      // In a real implementation, you'd integrate with Stripe, PayPal, etc.
      const updatedSession = await client.processPayment(checkoutSession.id, 'stripe')

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
      setCouponError('Invalid or expired coupon code')
    } finally {
      setCouponLoading(false)
    }
  }

  const removeCoupon = async (code: string) => {
    if (!cart) return

    setCouponLoading(true)
    setCouponError(null)

    try {
      const updatedCart = await client.removeCoupon(code)
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
      setCouponError('Failed to remove coupon')
    } finally {
      setCouponLoading(false)
    }
  }

  if (isLoading && !cart) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your cart...</p>
        </div>
      </div>
    )
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Add some items to your cart to get started.
            </p>
            <Link href="/">
              <Button className="w-full">Continue Shopping</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Get the current totals from checkout session or cart
  const currentTotals = checkoutSession?.totals || cart?.totals
  const shippingCost = checkoutSession?.shipping?.cost?.amount || 0
  const finalTotal = currentTotals?.total?.amount || 0

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

          {/* Step Content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {currentStep === 1 && (
                  <>
                    <MapPin className="w-5 h-5" />
                    <span>Contact & Shipping Information</span>
                  </>
                )}
                {currentStep === 2 && (
                  <>
                    <Truck className="w-5 h-5" />
                    <span>Shipping Method</span>
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
            <CardContent className="space-y-6">
              {/* Information Step */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <FloatingLabelInput
                        id="firstName"
                        label="First Name"
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
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
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
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
                      onChange={(e) => handleInputChange('email', e.target.value)}
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
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="+1 (555) 123-4567"
                  />

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Shipping Address</h3>
                    <div>
                      <FloatingLabelInput
                        id="shippingAddress1"
                        label="Address Line 1"
                        type="text"
                        value={formData.shippingAddress.address1}
                        onChange={(e) =>
                          handleAddressChange('shippingAddress', 'address1', e.target.value)
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
                      onChange={(e) =>
                        handleAddressChange('shippingAddress', 'address2', e.target.value)
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
                          onChange={(e) =>
                            handleAddressChange('shippingAddress', 'city', e.target.value)
                          }
                          placeholder="New York"
                          required
                          className={formErrors.shippingCity ? 'border-destructive' : ''}
                        />
                        {formErrors.shippingCity && (
                          <p className="text-sm text-destructive mt-1">{formErrors.shippingCity}</p>
                        )}
                      </div>
                      <div>
                        <FloatingLabelInput
                          id="shippingProvince"
                          label="State/Province"
                          type="text"
                          value={formData.shippingAddress.province}
                          onChange={(e) =>
                            handleAddressChange('shippingAddress', 'province', e.target.value)
                          }
                          placeholder="NY"
                          required
                          className={formErrors.shippingProvince ? 'border-destructive' : ''}
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
                          onChange={(e) =>
                            handleAddressChange('shippingAddress', 'zip', e.target.value)
                          }
                          placeholder="10001"
                          required
                          className={formErrors.shippingZip ? 'border-destructive' : ''}
                        />
                        {formErrors.shippingZip && (
                          <p className="text-sm text-destructive mt-1">{formErrors.shippingZip}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4">
                    <Button onClick={updateCustomerInfo} size="lg" className="min-w-[140px]">
                      Continue to Shipping
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Shipping Step */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  {checkoutSession?.shipping?.method ? (
                    <div className="border rounded-lg p-4 bg-muted/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Truck className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{checkoutSession.shipping.method.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {checkoutSession.shipping.method.description}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Estimated delivery: {checkoutSession.shipping.method.estimatedDays}{' '}
                              days
                            </p>
                          </div>
                        </div>
                        <Badge variant="secondary">${checkoutSession.shipping.cost.amount}</Badge>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Truck className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground">Standard shipping will be applied</p>
                    </div>
                  )}

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(1)} size="lg">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Information
                    </Button>
                    <Button onClick={updateShippingInfo} size="lg" className="min-w-[140px]">
                      Continue to Payment
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Payment Step */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="bg-muted/50 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground mb-4">
                      For demo purposes, payment processing is simulated. In a real implementation,
                      you would integrate with Stripe, PayPal, or another payment provider.
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

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setCurrentStep(2)} size="lg">
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back to Shipping
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
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
              )}
            </CardContent>
          </Card>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-96">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5" />
                <span>Order Summary</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Cart Items */}
              <div className="space-y-3">
                {cart?.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-muted rounded-md flex items-center justify-center">
                      {item.product.images?.[0] ? (
                        <img
                          src={item.product.images[0].url}
                          alt={item.product.name}
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        <ShoppingBag className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{item.product.name}</p>
                      <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${item.totalPrice.amount}</p>
                  </div>
                ))}
              </div>

              <Separator />

              {/* Coupon Code Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Have a coupon?</h4>
                </div>
                <div className="flex space-x-2">
                  <FloatingLabelInput
                    id="couponCode"
                    label="Coupon Code"
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && applyCoupon()}
                  />
                  <Button
                    onClick={applyCoupon}
                    disabled={couponLoading || !couponCode.trim()}
                    variant="outline"
                    size="sm"
                    className="min-w-[80px]"
                  >
                    {couponLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Apply'}
                  </Button>
                </div>
                {couponError && <p className="text-sm text-destructive">{couponError}</p>}
                {cart?.appliedCoupons && cart.appliedCoupons.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Applied Coupons:</p>
                    {cart.appliedCoupons.map((coupon) => (
                      <div
                        key={coupon.id}
                        className="flex items-center justify-between bg-green-50 border border-green-200 rounded-md p-2"
                      >
                        <div className="flex-1">
                          <p className="text-sm font-medium text-green-800">{coupon.couponCode}</p>
                          <p className="text-xs text-green-600">{coupon.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-medium text-green-800">
                            -${coupon.discountAmount.amount}
                          </span>
                          <Button
                            onClick={() => removeCoupon(coupon.couponCode)}
                            disabled={couponLoading}
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-green-600 hover:text-green-800 hover:bg-green-100"
                          >
                            <span className="sr-only">Remove coupon</span>×
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Separator />

              {/* Order Totals */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal</span>
                  <span>${currentTotals?.subtotal?.amount || '0.00'}</span>
                </div>
                {shippingCost > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>${shippingCost}</span>
                  </div>
                )}
                {currentTotals?.tax?.amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${currentTotals.tax.amount}</span>
                  </div>
                )}
                {currentTotals?.discount?.amount > 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Discount</span>
                    <span>-${currentTotals.discount.amount}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${finalTotal}</span>
                </div>
              </div>

              {/* Security Badge */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-800 font-medium">Secure Checkout</span>
                </div>
                <p className="text-xs text-green-700 mt-1">
                  Your payment information is encrypted and secure.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
