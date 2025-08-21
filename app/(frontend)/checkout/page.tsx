import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const CheckoutPage = () => {
  return (
    <div className="container mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

        {/* Shipping Information */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Shipping Information</h2>
          <form className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First Name</Label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last Name</Label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Main St" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" placeholder="Anytown" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="state">State</Label>
                <Input id="state" placeholder="CA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input id="zip" placeholder="12345" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input type="email" id="email" placeholder="john.doe@example.com" />
            </div>
          </form>

          <Separator />

          <h2 className="text-2xl font-semibold">Shipping Method</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between border rounded-lg p-4">
                <Label htmlFor="shipping-standard">Standard Shipping (5-7 days)</Label>
                <span>$5.00</span>
            </div>
            <div className="flex items-center justify-between border rounded-lg p-4 bg-gray-100 dark:bg-zinc-800">
                <Label htmlFor="shipping-express">Express Shipping (1-2 days)</Label>
                <span>$15.00</span>
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold">Payment Details</h2>
          <div className="border rounded-lg p-6 bg-gray-50 dark:bg-zinc-900">
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="card-number">Card Number</Label>
                <Input id="card-number" placeholder="**** **** **** 1234" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry-date">Expiry Date</Label>
                  <Input id="expiry-date" placeholder="MM/YY" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvc">CVC</Label>
                  <Input id="cvc" placeholder="123" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="name-on-card">Name on Card</Label>
                <Input id="name-on-card" placeholder="John Doe" />
              </div>
              <Separator className="my-6" />
              <Button className="w-full" size="lg">
                Pay Now
              </Button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
