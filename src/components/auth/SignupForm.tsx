'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Facebook, Instagram, Mail, Twitter } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '../ui/button'
import { FloatingLabelInput } from '../ui/floating-label-input'

import { SocialButton } from './SocialButton'
import { handleSocialSignup } from './auth-handlers'
import { signupSchema, type SignupFormData } from './auth-schemas'
import { useAuthStore } from '@/store/auth-store'

export const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { signup, isLoading } = useAuthStore()

  const form = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return (
    <div className="p-6 space-y-4">
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
      <form onSubmit={form.handleSubmit(async (data) => {
        try {
          await signup(data.email, data.password)
          // The auth store will handle the redirect
        } catch (error) {
          // Error is handled by the auth store
        }
      })} className="space-y-4">
        <div className="space-y-1">
          <FloatingLabelInput
            id="signup-email"
            type="email"
            label="Email Address"
            placeholder="Enter your email address"
            icon={<Mail size={18} />}
            {...form.register('email')}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
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
            {...form.register('password')}
          />
          {form.formState.errors.password && (
            <p className="text-sm text-red-500">{form.formState.errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="outline"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Continue with Email'}
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
    </div>
  )
}
