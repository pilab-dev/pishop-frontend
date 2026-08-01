import { Footer, Media } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaLocationArrow,
  FaMailBulk,
  FaPhoneAlt,
} from 'react-icons/fa'
import { SiX } from 'react-icons/si'
import { FancyTitle } from './fancy-title'
import { SubscribeForm } from './ui/subscribe-form'

type NavItem = {
  link: {
    type?: ('reference' | 'custom') | null
    newTab?: boolean | null
    reference?: {
      relationTo: 'pages' | 'posts'
      value: { slug: string }
    } | null
    url?: string | null
    label: string
  }
  id?: string
}

type QuckLinksProps = {
  navItems?: { link: { label: string } }[]
}

const QuckLinks: FC<QuckLinksProps> = ({ navItems }) => {
  const links = [
    { label: 'Home', url: '/' },
    { label: 'About us', url: '/about' },
    { label: 'Blog', url: '/blog' },
    { label: 'Services', url: '/service' },
    { label: 'Contact us', url: '/contact' },
  ]

  return (
    <div className="footer-links flex flex-col gap-8 md:flex-row md:gap-16">
      <div>
        <h3 className="font-bold text-lg md:text-xl mb-5 uppercase">
          <FancyTitle label="Quick links" />
        </h3>
        <div
          className="w-full space-x-20 flex flex-row justify-between 
        md:justify-normal"
        >
          <ul className="list list-outside space-y-3 text-sm md:text-base">
            {links.map((link) => (
              <li className="list-item" key={link.url}>
                <Link href={link.url} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg md:text-xl mb-5 uppercase">
          <FancyTitle label="Customer Care" />
        </h3>
        <div className="flex flex-row space-x-12">
          <ul className="list list-outside space-y-3 text-sm md:text-base">
            <li className="list-item">
              <Link href="/account">My account</Link>
            </li>
            <li className="list-item">
              <Link href="/track-order">Order tracking</Link>
            </li>
            <li className="list-item">
              <Link href="/wishlist">Wish list</Link>
            </li>
            <li className="list-item">
              <Link href="/contact">Returns/Exchange</Link>
            </li>
            <li className="list-item">
              <Link href="/docs">FAQs</Link>
            </li>
            <li className="list-item">
              <Link href="/docs">Product support</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

const FooterContactSection = ({
  contactEmail,
  contactPhone,
  contactAddress,
  logo,
}: {
  contactEmail: string
  contactPhone: string
  contactAddress: string
  logo?: Media | null
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        {logo?.url && (
          <Image
            alt="PiShop Logo"
            title="PiShop Logo"
            src={logo.url}
            width={180}
            height={100}
            className="mb-8"
          />
        )}
        <FancyTitle label="PiShop" /> is the <i>fastest</i> e-commerce engine in th market! When you
        are looking for the best e-commerce solution, you can count on us! We have a{' '}
        <strong>
          REST <FancyTitle label="API" />{' '}
        </strong>
        for you! You can use it to create your own e-commerce platform!
      </div>
      <div className="text-sm md:text-md flex flex-col gap-2">
        <div className="flex flex-row gap-2">
          <FaLocationArrow fontSize={16} className="my-auto text-primary" />
          {contactAddress}
        </div>
        <div className="flex flex-row gap-2">
          <FaPhoneAlt fontSize={16} className="my-auto text-primary" />
          {contactPhone}
        </div>

        <div className="flex flex-row gap-2">
          <FaMailBulk fontSize={16} className="my-auto text-primary" />
          {contactEmail}
        </div>
      </div>
    </div>
  )
}

const CopyrightSection = ({ copyright }: { copyright: string }) => {
  return (
    <div className="w-full page-gray-900 text-white">
      <div
        className="mx-auto
        px-0 py-5
        md:px-12 md:py-5 max-w-[1280px]"
      >
        <div
          className="
          flex flex-col 
          md:flex-row gap-5 md:gap-16"
        >
          <div className="my-auto text-center md:text-left text-sm font-medium">{copyright}</div>
          <div className="my-auto flex flex-row justify-center sm:justify-start gap-4 text-2xl">
            <Link href="/" className="hover:text-primary">
              <SiX />
            </Link>
            <Link href="/" className="hover:text-primary">
              <FaLinkedin />
            </Link>
            <Link href="/" className="hover:text-primary">
              <FaInstagram />
            </Link>
            <Link href="/" className="hover:text-primary">
              <FaFacebook />
            </Link>
          </div>
          <div className="flex-1 flex flex-row justify-end">
            <Image
              src="/images/credit-card-logos-2.webp"
              alt="Accepted cards"
              title="Accepted cards"
              width={200}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export const PageFooter = async () => {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = (footerData?.navItems as NavItem[]) || []

  return (
    <footer className="w-full page-gray-800">
      <SubscribeForm />

      <div>
        <div className="mx-auto px-5 my-5 md:px-12 md:my-12 w-full max-w-[1280px]">
          <div className="flex flex-col gap-16 md:flex-row">
            <div className="flex-1 ">
              <FooterContactSection
                contactEmail={footerData?.contactInformation?.contactEmail || ''}
                contactPhone={footerData?.contactInformation?.contactPhone || ''}
                contactAddress={footerData?.contactInformation?.contactAddress || ''}
                logo={footerData?.logo as unknown as Media}
              />
            </div>
            <div>
              <QuckLinks navItems={navItems} />
            </div>
          </div>
        </div>
      </div>
      <CopyrightSection copyright={footerData?.copy || ''} />
    </footer>
  )
}
