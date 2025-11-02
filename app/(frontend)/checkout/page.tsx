'use client'

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";

const CheckoutPage = () => {
  const { cart, isLoading, error, init, createCheckout } = useCartStore();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(1); // 1: Information, 2: Shipping, 3: Payment
  const [shippingOptions, setShippingOptions] = useState<any[]>([]);
  const [selectedShippingOption, setSelectedShippingOption] = useState<any | null>(null);
  const [loadingShipping, setLoadingShipping] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);

  useEffect(() => {
    init();
  }, [init]);

  useEffect(() => {
    const fetchShippingOptions = async () => {
      if (!cart) return;
      setLoadingShipping(true);
      try {
        const response = await fetch('/api/shipping/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cartItems: cart.items, shippingAddress: {} }), // Mock address for now
        });
        const data = await response.json();
        setShippingOptions(data.shippingOptions);
        if (data.shippingOptions.length > 0 && !selectedShippingOption) {
          setSelectedShippingOption(data.shippingOptions[0]); // Select first option by default
        }
      } catch (error) {
        console.error('Error fetching shipping options:', error);
      } finally {
        setLoadingShipping(false);
      }
    };

    if (cart && cart.items.length > 0) {
      fetchShippingOptions();
    }
  }, [cart, selectedShippingOption]);

  const handlePlaceOrder = async () => {
    setPaymentProcessing(true);
    try {
      const sessionId = await createCheckout();
      if (sessionId) {
        router.push(`/order-confirmation?session_id=${sessionId}`);
      } else {
        alert('Failed to create checkout session.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      alert('An error occurred while placing your order. Please try again.');
    } finally {
      setPaymentProcessing(false);
    }
  };

  if (isLoading && !cart) {
    return <div className="container mx-auto p-4 text-center"><p>Loading...</p></div>;
  }

  if (!cart || cart.items.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p>Your cart is empty.</p>
        <Link href="/">
          <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700">
            Continue Shopping
          </button>
        </Link>
      </div>
    );
  }

  const finalTotal = (cart?.totals.total.amount || 0) + (selectedShippingOption?.price || 0);

  return (
    <div className="container mx-auto p-4 flex flex-col lg:flex-row gap-8">
      {/* Main Content Area */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6">Checkout</h1>

        {/* Step Indicator */}
        <div className="mb-8 flex justify-between text-sm font-medium text-gray-500">
          <span className={currentStep >= 1 ? "text-blue-600" : ""}>Information</span>
          <span className={currentStep >= 2 ? "text-blue-600" : ""}>Shipping</span>
          <span className={currentStep >= 3 ? "text-blue-600" : ""}>Payment</span>
        </div>

        {/* Information Step */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold mb-4">Shipping Information (Mocked)</h2>
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" id="fullName" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="John Doe" />
            </div>
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="123 Main St" />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" id="city" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="Anytown" />
            </div>
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">Zip Code</label>
              <input type="text" id="zip" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="12345" />
            </div>
            <button
              onClick={() => setCurrentStep(2)}
              className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700"
            >
              Continue to Shipping
            </button>
          </div>
        )}

        {/* Shipping Step */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Options</h2>
            {loadingShipping ? (
              <p>Loading shipping options...</p>
            ) : shippingOptions.length === 0 ? (
              <p>No shipping options available.</p>
            ) : (
              <div className="space-y-2">
                {shippingOptions.map((option) => (
                  <label key={option.id} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="shippingOption"
                      value={option.id}
                      checked={selectedShippingOption?.id === option.id}
                      onChange={() => setSelectedShippingOption(option)}
                      className="form-radio h-4 w-4 text-blue-600"
                    />
                    <span className="text-gray-900">
                      {option.name} - ${option.price.toFixed(2)}
                      <p className="text-sm text-gray-500">{option.description}</p>
                    </span>
                  </label>
                ))}
              </div>
            )}
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
              >
                Back to Information
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                disabled={!selectedShippingOption}
                className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Payment Step */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Payment Details (Mocked)</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">Card Number</label>
                <input type="text" id="cardNumber" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="**** **** **** ****" />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label htmlFor="expiry" className="block text-sm font-medium text-gray-700">Expiry Date</label>
                  <input type="text" id="expiry" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="MM/YY" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">CVV</label>
                  <input type="text" id="cvv" className="mt-1 block w-full p-2 border border-gray-300 rounded-md" placeholder="123" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 bg-gray-300 text-gray-800 rounded-full hover:bg-gray-400"
              >
                Back to Shipping
              </button>
              <button
                onClick={handlePlaceOrder}
                disabled={paymentProcessing || !selectedShippingOption}
                className="px-8 py-4 bg-green-600 text-white text-xl font-semibold rounded-full hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paymentProcessing ? 'Processing...' : 'Place Order'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary Sidebar */}
      <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-2 mb-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.product.name} (x{item.quantity})</span>
              <span>{item.totalPrice.amount}</span>
            </div>
          ))}
        </div>
        <div className="border-t pt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>{cart.totals.subtotal.amount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping:</span>
            <span>
              {selectedShippingOption ? `${selectedShippingOption.price.toFixed(2)}` : '-'}
            </span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Total:</span>
            <span>{finalTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
