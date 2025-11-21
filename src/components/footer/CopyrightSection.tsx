import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
} from 'react-icons/fa'
import { SiX } from 'react-icons/si'

type CopyrightSectionProps = {
  copyright: string
}

export const CopyrightSection: FC<CopyrightSectionProps> = ({ copyright }) => {
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

