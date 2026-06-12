import { ShoppingCart } from 'lucide-react'

export function CartFallback() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <ShoppingCart className="w-12 h-12 mx-auto mb-4 animate-pulse text-muted-foreground" />
          <p className="text-lg font-medium">Loading your cart...</p>
        </div>
      </div>
    </div>
  )
}
