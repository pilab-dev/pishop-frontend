'use client'

import { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { AnimatedPopover } from '../ui/animated-popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { useAuthStore } from '@/store/auth-store'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'
import { handleLogout } from './auth-handlers'

export const AuthSectionTop = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [open, setOpen] = useState(false)
  const { user, hydrated, hydrate, clear } = useAuthStore()

  useEffect(() => {
    if (!hydrated) hydrate()
  }, [hydrated, hydrate])

  const onLogout = async () => {
    await handleLogout()
    clear()
    setOpen(false)
  }

  if (user) {
    const trigger = (
      <button className="flex items-center gap-1.5 text-white hover:text-primary transition-colors text-sm font-medium">
        <FaUser className="h-2.5 w-2.5" />
        <span>Hi, {user.firstName || user.email}</span>
      </button>
    )

    return (
      <AnimatedPopover
        trigger={trigger}
        className="w-56 p-0 rounded-none border border-gray-200 shadow-none"
        open={open}
        onOpenChange={setOpen}
      >
        <div className="p-4 space-y-3">
          <p className="text-sm text-gray-900 font-medium">{user.email}</p>
          <button
            onClick={onLogout}
            className="w-full text-sm rounded-full bg-black text-white py-2 hover:bg-[#f5c615] hover:text-black transition-colors"
          >
            Log out
          </button>
        </div>
      </AnimatedPopover>
    )
  }

  const trigger = (
    <button className="flex items-center gap-1.5 text-white hover:text-primary transition-colors text-sm font-medium">
      <FaUser className="h-2.5 w-2.5" />
      <span>sign in</span>
      <span className="text-gray-500">or</span>
      <span>register</span>
    </button>
  )

  const content = (
    <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'login' | 'signup')}>
      <TabsList className="grid w-full grid-cols-2 rounded-none border-b">
        <TabsTrigger
          value="login"
          className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          Login
        </TabsTrigger>
        <TabsTrigger
          value="signup"
          className="rounded-none data-[state=active]:bg-primary data-[state=active]:text-white"
        >
          Sign Up
        </TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <LoginForm
          onSuccess={(loggedInUser) => {
            useAuthStore.getState().setUser(loggedInUser)
            setOpen(false)
          }}
        />
      </TabsContent>

      <TabsContent value="signup">
        <SignupForm />
      </TabsContent>
    </Tabs>
  )

  return (
    <AnimatedPopover
      trigger={trigger}
      className="w-80 p-0 shadow-xl border border-black"
      open={open}
      onOpenChange={setOpen}
    >
      {content}
    </AnimatedPopover>
  )
}
