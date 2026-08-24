import { create } from 'zustand'
import type { AuthUser } from '@/lib/client'

const USER_COOKIE = 'ps_user'

function readUserCookie(): AuthUser | null {
  if (typeof document === 'undefined') return null

  const match = document.cookie.match(new RegExp(`(?:^|; )${USER_COOKIE}=([^;]*)`))
  if (!match) return null

  try {
    return JSON.parse(decodeURIComponent(match[1]))
  } catch {
    return null
  }
}

interface AuthState {
  user: AuthUser | null
  hydrated: boolean
  hydrate: () => void
  setUser: (user: AuthUser) => void
  clear: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  hydrated: false,

  hydrate: () => set({ user: readUserCookie(), hydrated: true }),

  setUser: (user) => set({ user, hydrated: true }),

  clear: () => set({ user: null, hydrated: true }),
}))
