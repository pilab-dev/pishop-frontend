import { FancyTitle } from '@/components/fancy-title'
import { BreadcrumbBar } from '@/components/products/breadcrumb-bar'
import { Footer } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import { BiCurrentLocation, BiMailSend, BiSolidPhone } from 'react-icons/bi'
import { LiaFacebookF, LiaGoogle, LiaInstagram, LiaTwitter } from 'react-icons/lia'
import { ContactForm } from './contact-form'

export default async function ContactPage() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const { contactEmail, contactPhone, contactAddress } = footerData?.contactInformation || {}
  const { facebookLink, twitterLink, instagramLink } = footerData.socialLinks || {}

  return (
    <>
      <BreadcrumbBar
        segments={[
          {
            name: 'Contact us',
            href: '/contact',
          },
        ]}
      />

      <div className="max-w-7xl mx-auto px-5">
        <div className="flex flex-col lg:flex-row gap-8 my-10">
          <div className="w-full lg:w-2/3">
            <ContactForm />
          </div>
          <div className="w-full lg:w-1/3 flex flex-col gap-8">
            <FancyTitle className="text-3xl font-bold" label="Get in touch" />

            <div className="text-sm md:text-normal flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <BiCurrentLocation fontSize={16} className="my-auto" />
                {contactAddress}
              </div>
              <div className="flex flex-row gap-2">
                <BiSolidPhone fontSize={16} className="my-auto" />
                <a
                  className="transition-colors hover:text-primary hover:underline"
                  href={`tel:${contactPhone.replaceAll(` `, '')}`}
                >
                  {contactPhone}
                </a>
              </div>

              <div className="flex flex-row gap-2">
                <BiMailSend fontSize={16} className="my-auto" />
                <a
                  className="transition-colors hover:text-primary hover:underline"
                  href={`mailto:${contactEmail}`}
                >
                  {contactEmail}
                </a>
              </div>
            </div>

            <FancyTitle className="text-3xl font-bold" label="Social Networks" />

            <div className="flex gap-4">
              {facebookLink && (
                <a
                  href={facebookLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black p-3 hover:bg-black hover:text-white"
                >
                  <LiaFacebookF />
                </a>
              )}

              {twitterLink && (
                <a
                  href={twitterLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black p-3 hover:bg-black hover:text-white"
                >
                  <LiaTwitter />
                </a>
              )}

              {instagramLink && (
                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-black p-3 hover:bg-black hover:text-white"
                >
                  <LiaInstagram />
                </a>
              )}

              <div className="border border-black p-3">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  <LiaGoogle />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
