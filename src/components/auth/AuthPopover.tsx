'use client'

import { User } from 'lucide-react'
import { useState } from 'react'

import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'

export const AuthPopover = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

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

            <TabsContent value="login">
              <LoginForm />
            </TabsContent>

            <TabsContent value="signup">
              <SignupForm />
            </TabsContent>
          </Tabs>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
