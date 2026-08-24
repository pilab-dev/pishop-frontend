import type { AuthUser } from '@/lib/client'
import type { LoginFormData, SignupFormData, FullSignupFormData } from './auth-schemas'

interface AuthApiResult {
  success: boolean
  user?: AuthUser
  message?: string
}

async function postAuth(path: string, body: unknown): Promise<AuthApiResult> {
  const res = await fetch(`/api/auth/${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json()

  if (!res.ok || !data.success) {
    return { success: false, message: data.errors?.[0]?.message || 'Something went wrong' }
  }

  return { success: true, user: data.user }
}

export const handleLogin = (data: LoginFormData): Promise<AuthApiResult> => {
  return postAuth('login', { email: data.email, password: data.password })
}

export const handleSignup = (data: SignupFormData): void => {
  const params = data.email ? `?email=${encodeURIComponent(data.email)}` : ''
  window.location.href = `/signup${params}`
}

export const handleFullSignup = (data: FullSignupFormData): Promise<AuthApiResult> => {
  return postAuth('register', {
    email: data.email,
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    acceptedTerms: data.acceptedTerms,
  })
}

export const handleLogout = async (): Promise<void> => {
  await fetch('/api/auth/logout', { method: 'POST' })
}

export const handleSocialLogin = (provider: string) => {
  console.log(`Social login with ${provider}`)
  // Handle social login logic here
}

export const handleSocialSignup = (provider: string) => {
  console.log(`Social signup with ${provider}`)
  // Handle social signup logic here
}
