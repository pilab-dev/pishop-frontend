'use client'

import { useState } from 'react'

import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'

import { FaUser } from 'react-icons/fa'
import { LoginForm } from './LoginForm'
import { SignupForm } from './SignupForm'

export const AuthPopover = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="flex items-center gap-1.5 text-white hover:text-primary transition-colors text-xs font-medium">
          <FaUser className="h-2.5 w-2.5" />
          <span>sign in</span>
          <span className="text-gray-500">or</span>
          <span>register</span>
        </button>
      </PopoverTrigger>
      <PopoverContent
        align="end"
        className="w-96 p-0 shadow-xl border border-black"
        side="bottom"
        sideOffset={10}
      >
        <PopoverArrow className="fill-white relative top-[-1px] h-2 w-4" />
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
      </PopoverContent>
    </Popover>
  )
}
