import { Footer, Media } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import config from '@payload-config'
import Image from 'next/image'
import Link from 'next/link'
import { getPayload } from 'payload'
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

type MenuItem = {
  title: string
  path: string
}

type QuckLinksProps = {
  categories: MenuItem[]
}

const QuckLinks: FC<QuckLinksProps> = ({ categories }) => {
  return (
    <div className="footer-links flex flex-col gap-8 md:flex-row md:gap-16">
      <div>
        <h3 className="font-bold text-lg md:text-xl mb-5 uppercase">
          <FancyTitle>Quick links</FancyTitle>
        </h3>
        <div
          className="w-full space-x-20 flex flex-row justify-between 
        md:justify-normal"
        >
          <ul className="list list-outside space-y-3 text-sm md:text-base">
            {categories.map((item) => (
              <li className="list-item" key={item.title}>
                <Link href={`/collections/${item.path}`}>{item.title}</Link>
              </li>
            ))}
          </ul>

          <ul
            className="list list-outside space-y-3 text-sm md:text-base text-right
          md:text-left
          "
          >
            <li className="list-item">Home</li>
            <li className="list-item">About us</li>
            <li className="list-item">Blog</li>
            <li className="list-item">Service</li>
            <li className="list-item">Contact us</li>
          </ul>
        </div>
      </div>

      {/* <!-- Customer Care --> */}
      <div>
        <h3 className="font-bold text-lg md:text-xl mb-5 uppercase">
          <FancyTitle>Customer Care</FancyTitle>
        </h3>
        <div className="flex flex-row space-x-12">
          <ul className="list list-outside space-y-3 text-sm md:text-base">
            <li className="list-item">My account</li>
            <li className="list-item">Order tracking</li>
            <li className="list-item">Whish list</li>
            <li className="list-item">Returns/Exchange</li>
            <li className="list-item">FAQs</li>
            <li className="list-item">
              <Link href="/">Product support</Link>
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
  logo: Media
}) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Image
          alt="PiShop Logo"
          title="PiShop Logo"
          src={logo.url!}
          width={180}
          height={100}
          className="mb-8"
        />
        <FancyTitle>PiShop</FancyTitle> is the <i>fastest</i> e-commerce engine in th market! When
        you are looking for the best e-commerce solution, you can count on us! We have a{' '}
        <strong>
          REST <FancyTitle>API</FancyTitle>{' '}
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
            <img
              src="/images/credit-card-logos-2.png"
              alt="Accepted cards"
              title="Accepted cards"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

const getPageFooter = async () => {
  const payload = await getPayload({ config })
  const footerReponse = payload.findGlobal({
    slug: 'footer',
  })

  return (await footerReponse).navItems
}

export const PageFooter = async () => {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const categories =
    (footerData?.navItems?.map(({ link }) => ({
      title: link?.label,
      path: link?.url,
    })) as MenuItem[]) || []

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
              <QuckLinks categories={categories} />
            </div>
          </div>
        </div>
      </div>
      <CopyrightSection copyright={footerData?.copy || ''} />
    </footer>
  )
}
