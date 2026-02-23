'use client'

import { cn } from '@/lib/utils'
import { createRef } from 'react'
import { FancyTitle } from '../fancy-title'
import { FloatingLabelInput } from './floating-label-input'
import {Input} from "@ui/input";

/**
 * Subscribe form
 */
export const SubscribeForm = () => {
  const ref = createRef<HTMLInputElement>()

  /**
   * Handle subscribe
   */
  const handleSubscribe = () => {
    console.log(ref.current?.value)
    ref.current?.focus()
  }

  return (
    <form className="w-full page-gray-950 text-white">
      <div className="mx-auto px-4 md:px-12 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-5 justify-center content-center">
          <div className="font-medium uppercase my-auto">
            <span
              role="button"
              className="underline text-primary cursor-pointer"
              onClick={handleSubscribe}
            >
              Subscribe
            </span>{' '}
            to newsletter
          </div>
          <div className="my-auto">
            and receive{' '}
            <span className="italic">
              <FancyTitle label="$20" />
            </span>{' '}
            coupon for first shopping
          </div>

          <div className="flex-1">
            <Input
              variant="dark"
              ref={ref}
              type="email"
              placeholder="Email address"
              className={cn(
                `active:border-primary active:outline-none`,
              )}
            />
          </div>
        </div>
      </div>
    </form>
  )
}
