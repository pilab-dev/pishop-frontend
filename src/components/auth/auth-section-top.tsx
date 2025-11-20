'use client'

import { useAuthStore } from '@/store/auth-store'
import { useMemo, useState } from 'react'
import { FaSignOutAlt, FaUser } from 'react-icons/fa'
import { AnimatedPopover } from '../ui/animated-popover'
import { Button } from '../ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'

export const AuthSectionTop = () => {
  const { user, isAuthenticated, logout } = useAuthStore()
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

  const trigger = useMemo(
    () => (
      <button className="flex items-center gap-1.5 text-white hover:text-primary transition-colors text-sm font-medium">
        <FaUser className="h-2.5 w-2.5" />
        {isAuthenticated ? (
          <>
            <span>Hi, {user?.name || user?.email?.split('@')[0]}</span>
          </>
        ) : (
          <>
            <span>sign in</span>
            <span className="text-gray-500">or</span>
            <span>register</span>
          </>
        )}
      </button>
    ),
    [isAuthenticated, user],
  )

  const content = isAuthenticated ? (
    <div className="p-4 space-y-4">
      <div className="text-center">
        <p className="font-medium">{user?.name || 'User'}</p>
        <p className="text-sm text-gray-600">{user?.email}</p>
        <p className="text-xs text-gray-500 mt-1">Role: {user?.role}</p>
      </div>
      <Button onClick={logout} variant="outline" className="w-full flex items-center gap-2">
        <FaSignOutAlt className="h-3 w-3" />
        Sign Out
      </Button>
    </div>
  ) : (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}>
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

      <TabsContent value="login">
        <LoginForm />
      </TabsContent>

      <TabsContent value="signup">
        <SignupForm />
      </TabsContent>
    </Tabs>
  )

  return <AnimatedPopover trigger={trigger}>{content}</AnimatedPopover>
}
