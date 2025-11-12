'use client'

import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { AnimatedPopover } from '../ui/animated-popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'

export const AuthPopover = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

  const trigger = (
    <button className="flex items-center gap-1.5 text-white hover:text-primary transition-colors text-xs font-medium">
      <FaUser className="h-2.5 w-2.5" />
      <span>sign in</span>
      <span className="text-gray-500">or</span>
      <span>register</span>
    </button>
  )

  const content = (
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
