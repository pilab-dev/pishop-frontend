'use client'

import { Lock, Mail } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { Button } from './ui/button'
import { Checkbox } from './ui/checkbox'
import { FloatingLabelInput } from './ui/floating-label-input'
import { Label } from './ui/label'

interface ILoginForm {
  email: string
  password: string
}

export const LoginPopover = () => {
  const { register } = useForm<ILoginForm>()

  return (
    <form>
      <div className="flex flex-col gap-5">
        <h3 className="text-xl">My account</h3>

        <FloatingLabelInput
          id="email"
          type="email"
          label="Email"
          placeholder="Enter your email"
          icon={<Mail size={18} />}
          {...register('email')}
        />
        <FloatingLabelInput
          id="password"
          type="password"
          label="Password"
          placeholder="Enter your password"
          icon={<Lock size={18} />}
          {...register('password')}
        />

        <div className="flex items-center gap-3">
          <Checkbox id="remember-me" />
          <Label htmlFor="remember-me">Remember me</Label>
        </div>

        <Button type="submit">Login</Button>
      </div>
    </form>
  )
}
