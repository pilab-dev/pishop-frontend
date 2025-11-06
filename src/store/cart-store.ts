import { create } from 'zustand'
import { client, Cart, Product } from '@/lib/client'

interface CartState {
  cart: Cart | null
  isLoading: boolean
  error: string | null
  init: () => Promise<void>
  refresh: () => Promise<void>
  reset: () => void
  addToCart: (product: Product, quantity: number, variantId?: string) => Promise<void>
  removeFromCart: (itemId: string) => Promise<void>
  updateItemQuantity: (itemId: string, quantity: number) => Promise<void>
  applyCoupon: (code: string) => Promise<void>
  removeCoupon: (couponId: string) => Promise<void>
  setShippingMethod: (methodId: string, destination?: any) => Promise<void>
  createCheckout: () => Promise<string | null>
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: null,
  isLoading: false,
  error: null,

  init: async () => {
    // Don't reinitialize if we already have a cart
    const currentState = get()
    if (currentState.cart || currentState.isLoading) {
      console.log('Cart already initialized or loading, skipping init')
      return
    }

    console.log('Initializing cart...')
    set({ isLoading: true, error: null })
    try {
      let cart = await client.getCart()
      if (!cart) {
        console.log('No existing cart found, creating new cart')
        cart = await client.createCart()
      } else {
        console.log('Found existing cart:', cart.id)
      }
      set({ cart, isLoading: false })
    } catch (error) {
      console.error('Cart initialization error:', error)
      set({ error: 'Failed to initialize cart', isLoading: false })
    }
  },

  refresh: async () => {
    console.log('Refreshing cart...')
    set({ isLoading: true, error: null })
    try {
      const cart = await client.getCart()
      set({ cart, isLoading: false })
    } catch (error) {
      console.error('Cart refresh error:', error)
      set({ error: 'Failed to refresh cart', isLoading: false })
    }
  },

  reset: () => {
    console.log('Resetting cart state')
    set({ cart: null, isLoading: false, error: null })
  },

  addToCart: async (product, quantity, variantId) => {
    set({ isLoading: true, error: null })
    try {
      const { cart } = await client.addToCart(product.id, quantity, variantId)
      set({ cart, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to add item to cart', isLoading: false })
      console.error(error)
    }
  },

  removeFromCart: async (itemId) => {
    set({ isLoading: true, error: null })
    try {
      const cart = await client.removeFromCart(itemId)
      set({ cart, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to remove item from cart', isLoading: false })
      console.error(error)
    }
  },

  updateItemQuantity: async (itemId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(itemId)
      return
    }
    set({ isLoading: true, error: null })
    try {
      const { cart } = await client.updateCartItem(itemId, quantity)
      set({ cart, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to update item quantity', isLoading: false })
      console.error(error)
    }
  },

  applyCoupon: async (code) => {
    set({ isLoading: true, error: null })
    try {
      const cart = await client.applyCoupon(code)
      set({ cart, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to apply coupon', isLoading: false })
      console.error(error)
    }
  },

  removeCoupon: async (couponId) => {
    set({ isLoading: true, error: null })
    try {
      const cart = await client.removeCoupon(couponId)
      set({ cart, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to remove coupon', isLoading: false })
      console.error(error)
    }
  },

  setShippingMethod: async (methodId, destination) => {
    set({ isLoading: true, error: null })
    try {
      const cart = await client.setShippingMethod(methodId, destination || {})
      set({ cart, isLoading: false })
    } catch (error) {
      set({ error: 'Failed to set shipping method', isLoading: false })
      console.error(error)
    }
  },

  createCheckout: async () => {
    set({ isLoading: true, error: null })
    try {
      const session = await client.createCheckout()
      set({ isLoading: false })
      return session.id
    } catch (error) {
      set({ error: 'Failed to create checkout session', isLoading: false })
      console.error(error)
      return null
    }
  },
}))