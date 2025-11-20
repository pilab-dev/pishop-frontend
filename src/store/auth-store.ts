import { create } from 'zustand'
import type { User } from '@/payload-types'

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  init: () => Promise<void>
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  refresh: () => Promise<void>
  reset: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,

  init: async () => {
    // Don't reinitialize if we already have user info or are loading
    const currentState = get()
    if (currentState.user !== null || currentState.isLoading) {
      console.log('Auth already initialized or loading, skipping init')
      return
    }

    console.log('Initializing auth...')
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/users/me', {
        credentials: 'include',
      })

      if (response.ok) {
        const { user } = await response.json()
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
        console.log('User authenticated:', user.email)
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
        console.log('User not authenticated')
      }
    } catch (error) {
      console.error('Auth initialization error:', error)
      set({
        error: 'Failed to initialize authentication',
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const { user } = await response.json()
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
        console.log('User logged in:', user.email)
      } else {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      set({
        error: error instanceof Error ? error.message : 'Login failed',
        isLoading: false,
      })
      throw error
    }
  },

  signup: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      // For now, redirect to signup page as per current behavior
      // In the future, this could create the account directly
      console.log('Redirecting to signup page with email:', email)
      window.location.href = `/signup?email=${encodeURIComponent(email)}`
    } catch (error) {
      console.error('Signup error:', error)
      set({
        error: error instanceof Error ? error.message : 'Signup failed',
        isLoading: false,
      })
      throw error
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (response.ok) {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
        console.log('User logged out')
      } else {
        throw new Error('Logout failed')
      }
    } catch (error) {
      console.error('Logout error:', error)
      set({
        error: error instanceof Error ? error.message : 'Logout failed',
        isLoading: false,
      })
      // Still clear user state even if logout request fails
      set({
        user: null,
        isAuthenticated: false,
      })
    }
  },

  refresh: async () => {
    console.log('Refreshing auth...')
    set({ isLoading: true, error: null })
    try {
      const response = await fetch('/api/users/me', {
        credentials: 'include',
      })

      if (response.ok) {
        const { user } = await response.json()
        set({
          user,
          isAuthenticated: true,
          isLoading: false,
        })
        console.log('User refreshed:', user.email)
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
        console.log('User not authenticated after refresh')
      }
    } catch (error) {
      console.error('Auth refresh error:', error)
      set({
        error: 'Failed to refresh authentication',
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    }
  },

  reset: () => {
    console.log('Resetting auth state')
    set({
      user: null,
      isLoading: false,
      error: null,
      isAuthenticated: false,
    })
  },
}))
