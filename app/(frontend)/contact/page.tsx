'use client'

import { BreadcrumbBar } from '@/components/products/breadcrumb-bar'
import { FancyTitle } from '@/components/fancy-title'
import { ContactForm } from './contact-form'

export default function PricingPage() {
  return (
    <>
      <BreadcrumbBar
        segments={[
          {
            name: 'Contact',
            href: '/contact',
          },
        ]}
      />

      <div className="max-w-7xl w-full">
        <div className="flex flex-row gap-8 my-10">
          <div className="w-2/3">
            <ContactForm />
          </div>
          <div className="w-1/3 flex flex-col gap-8">
            <FancyTitle className="text-3xl font-bold" label="Get in touch" />
            <p className="text-lg text-gray-500">
              We&apos;re here to help you with any questions or concerns you have.
            </p>

            <FancyTitle className="text-3xl font-bold" label="Social Networks" />
          </div>
        </div>
      </div>
    </>
  )
}
