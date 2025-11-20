import { Media } from '@/payload-types'
import Image from 'next/image'
import { FC } from 'react'
import {
  FaLocationArrow,
  FaMailBulk,
  FaPhoneAlt,
} from 'react-icons/fa'
import { FancyTitle } from '../fancy-title'

type FooterContactSectionProps = {
  contactEmail: string
  contactPhone: string
  contactAddress: string
  logo: Media
}

export const FooterContactSection: FC<FooterContactSectionProps> = ({
  contactEmail,
  contactPhone,
  contactAddress,
  logo,
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
