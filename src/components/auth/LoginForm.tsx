'use client'

import { Eye, EyeOff, Facebook, Mail } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '../ui/button'
import { Checkbox } from '../ui/checkbox'
import { FloatingLabelInput } from '../ui/floating-label-input'
import { Label } from '../ui/label'

import { SocialButton } from './SocialButton'
import { loginSchema, type LoginFormData } from './auth-schemas'
import { handleLogin, handleSocialLogin } from './auth-handlers'

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
  })

  return (
    <div className="p-6 space-y-4">
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
      <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">
        <div className="space-y-1">
          <FloatingLabelInput
            id="login-email"
            type="email"
            label="Email or Username"
            placeholder="Enter your email or username"
            icon={<Mail size={18} />}
            {...form.register('email')}
          />
          {form.formState.errors.email && (
            <p className="text-sm text-red-500">
              {form.formState.errors.email.message}
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
              {...form.register('password')}
            />
          </div>
          {form.formState.errors.password && (
            <p className="text-sm text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox id="remember" {...form.register('rememberMe')} />
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
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
    </div>
  )
}
