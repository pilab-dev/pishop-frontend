'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Facebook, Instagram, Mail, Twitter, User } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { FloatingLabelInput } from './ui/floating-label-input'
import { Label } from './ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
})

const signupSchema = z.object({
  email: z.string().email('Invalid email address').optional(),
  password: z.string().min(6, 'Password must be at least 6 characters').optional(),
})

type LoginFormData = z.infer<typeof loginSchema>
type SignupFormData = z.infer<typeof signupSchema>

interface SocialButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
  variant?: 'login' | 'signup'
}

const SocialButton = ({ icon, label, onClick, variant = 'login' }: SocialButtonProps) => {
  const baseClasses =
    'w-full flex items-center justify-center gap-3 py-3 px-4 rounded-lg border font-medium transition-colors hover:bg-gray-50'
  const variantClasses =
    variant === 'signup' ? 'border-gray-300 text-gray-700' : 'border-gray-300 text-gray-700'

  return (
    <button type="button" onClick={onClick} className={`${baseClasses} ${variantClasses}`}>
      {icon}
      <span className="text-sm">{label}</span>
    </button>
  )
}

export const AuthPopover = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [showPassword, setShowPassword] = useState(false)

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleLogin = (data: LoginFormData) => {
    console.log('Login data:', data)
    // Handle login logic here
  }

  const handleSignup = (data: SignupFormData) => {
    console.log('Signup data:', data)
    // Handle signup logic here - redirect to complete signup form
    window.location.href = '/signup'
  }

  const handleSocialLogin = (provider: string) => {
    console.log(`Social login with ${provider}`)
    // Handle social login logic here
  }

  const handleSocialSignup = (provider: string) => {
    console.log(`Social signup with ${provider}`)
    // Handle social signup logic here
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="flex items-center gap-1.5 text-white hover:text-primary transition-colors text-xs font-medium">
          <User className="h-3.5 w-3.5" />
          <span>Account</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-96 p-0 shadow-xl border-2 border-gray-200"
        avoidCollisions={true}
        collisionPadding={20}
      >
        <div className="bg-white rounded-lg">
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}
          >
            <TabsList className="grid w-full grid-cols-2 rounded-none rounded-t-lg border-b">
              <TabsTrigger
                value="login"
                className="rounded-none rounded-tl-lg data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="rounded-none rounded-tr-lg data-[state=active]:bg-primary data-[state=active]:text-white"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>

            {/* Login Tab */}
            <TabsContent value="login" className="p-6 space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Welcome Back</h3>
                <p className="text-sm text-gray-600 mt-1">Sign in to your account</p>
              </div>

              {/* Social Login Buttons */}
              <div className="space-y-3">
                <SocialButton
                  icon={
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      G
                    </div>
                  }
                  label="Continue with Google"
                  onClick={() => handleSocialLogin('google')}
                />
                <SocialButton
                  icon={
                    <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center text-white text-xs">
                      
                    </div>
                  }
                  label="Continue with Apple"
                  onClick={() => handleSocialLogin('apple')}
                />
                <SocialButton
                  icon={<Facebook className="w-5 h-5 text-blue-600" />}
                  label="Continue with Facebook"
                  onClick={() => handleSocialLogin('facebook')}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or continue with email</span>
                </div>
              </div>

              {/* Login Form */}
              <form onSubmit={loginForm.handleSubmit(handleLogin)} className="space-y-4">
                <div className="space-y-1">
                  <FloatingLabelInput
                    id="login-email"
                    type="email"
                    label="Email or Username"
                    placeholder="Enter your email or username"
                    icon={<Mail size={18} />}
                    {...loginForm.register('email')}
                  />
                  {loginForm.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {loginForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <div className="relative">
                    <FloatingLabelInput
                      id="login-password"
                      type={showPassword ? 'text' : 'password'}
                      label="Password"
                      placeholder="Enter your password"
                      icon={
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      }
                      {...loginForm.register('password')}
                    />
                  </div>
                  {loginForm.formState.errors.password && (
                    <p className="text-sm text-red-500">
                      {loginForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="remember" {...loginForm.register('rememberMe')} />
                    <Label htmlFor="remember" className="text-sm text-gray-600">
                      Remember me
                    </Label>
                  </div>
                  <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginForm.formState.isSubmitting}
                >
                  {loginForm.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            {/* Signup Tab */}
            <TabsContent value="signup" className="p-6 space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Create Account</h3>
                <p className="text-sm text-gray-600 mt-1">Join us today</p>
              </div>

              {/* Social Signup Buttons */}
              <div className="space-y-3">
                <SocialButton
                  variant="signup"
                  icon={
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      G
                    </div>
                  }
                  label="Sign up with Google"
                  onClick={() => handleSocialSignup('google')}
                />
                <SocialButton
                  variant="signup"
                  icon={<Facebook className="w-5 h-5 text-blue-600" />}
                  label="Sign up with Facebook"
                  onClick={() => handleSocialSignup('facebook')}
                />
                <SocialButton
                  variant="signup"
                  icon={<Twitter className="w-5 h-5 text-blue-400" />}
                  label="Sign up with X (Twitter)"
                  onClick={() => handleSocialSignup('twitter')}
                />
                <SocialButton
                  variant="signup"
                  icon={<Instagram className="w-5 h-5 text-pink-500" />}
                  label="Sign up with Instagram"
                  onClick={() => handleSocialSignup('instagram')}
                />
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white px-2 text-gray-500">Or sign up with email</span>
                </div>
              </div>

              {/* Quick Signup Form */}
              <form onSubmit={signupForm.handleSubmit(handleSignup)} className="space-y-4">
                <div className="space-y-1">
                  <FloatingLabelInput
                    id="signup-email"
                    type="email"
                    label="Email Address"
                    placeholder="Enter your email address"
                    icon={<Mail size={18} />}
                    {...signupForm.register('email')}
                  />
                  {signupForm.formState.errors.email && (
                    <p className="text-sm text-red-500">
                      {signupForm.formState.errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1">
                  <FloatingLabelInput
                    id="signup-password"
                    type={showPassword ? 'text' : 'password'}
                    label="Create Password"
                    placeholder="Create a strong password"
                    icon={
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="p-1 text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors"
                      >
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    }
                    {...signupForm.register('password')}
                  />
                  {signupForm.formState.errors.password && (
                    <p className="text-sm text-red-500">
                      {signupForm.formState.errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="outline"
                  className="w-full"
                  disabled={signupForm.formState.isSubmitting}
                >
                  {signupForm.formState.isSubmitting
                    ? 'Creating account...'
                    : 'Continue with Email'}
                </Button>
              </form>

              <p className="text-xs text-gray-500 text-center mt-4">
                By signing up, you agree to our{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </TabsContent>
          </Tabs>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
