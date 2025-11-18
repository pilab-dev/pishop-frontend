'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ShoppingBag } from 'lucide-react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

// Dynamically import heavy components to reduce initial bundle size
const Button = dynamic(() => import('@/components/ui/button').then((mod) => mod.Button), {
  loading: () => <div className="h-10 bg-gray-200 animate-pulse rounded" />,
})

export const CheckoutEmptyCart = () => {
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




