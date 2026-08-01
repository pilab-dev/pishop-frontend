'use client'

import type { CategoryTreeNode } from '@/lib/client/types'
import { Header, Media } from '@/payload-types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import {
  FaCartPlus,
  FaFacebook,
  FaFlag,
  FaInstagram,
  FaMoneyBill,
  FaUser,
  FaWrench,
} from 'react-icons/fa'
import { SiX } from 'react-icons/si'
import { TfiHeart, TfiReload } from 'react-icons/tfi'
import { MegaMenu } from './mega-menu'
import { HeaderSearchForm } from './header-search-form'

// Dynamically import heavy components to reduce initial bundle size
const AuthPopover = dynamic(
  () => import('./auth/auth-section-top').then((mod) => ({ default: mod.AuthSectionTop })),
  {
    ssr: false,
    loading: () => (
      <button className="flex items-center gap-1.5 text-white hover:text-primary transition-colors text-sm font-medium">
        <FaUser className="h-2.5 w-2.5" />
        <span className="text-gray-500">Initializing authentication...</span>
      </button>
    ),
  },
)
const CartIcon = dynamic(() => import('./cart-icon').then((mod) => ({ default: mod.CartIcon })), {
  ssr: false,
  loading: () => <FaCartPlus fontSize={20} className="text-white animate-pulse" />,
})

const TopRow = () => {
  return (
    <div className="page-gray-950 hidden sm:block">
      <div className="max-w-[1280px] mx-auto px-5 py-2 flex flex-row justify-between items-center">
        <div>
          <ul className="flex flex-row text-sm space-x-3">
            <li>
              <Link href="/account">
                <FaFacebook />
              </Link>
            </li>
            <li>
              <Link href="/account">
                <FaInstagram />
              </Link>
            </li>
            <li>
              <Link href="/account">
                <SiX />
              </Link>
            </li>
          </ul>
        </div>

        <div className="flex items-center space-x-8 font-medium text-sm">
          <div className="flex flex-row items-center space-x-2">
            <FaFlag fontSize={14} />
            <span>English</span>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <FaWrench fontSize={14} />
            <span>Guarantee</span>
          </div>
          <div className="flex flex-row items-center space-x-2">
            <FaMoneyBill fontSize={14} />
            <span>USA Dollar</span>
          </div>

          <AuthPopover />
        </div>
      </div>
    </div>
  )
}

interface HeaderSectionDesktopProps {
  headerData: Header
  categories: any[]
  collections: any[]
  logo: Media
  navItems: any[]
  categoryTree: CategoryTreeNode[]
}

export const HeaderSectionDesktop = ({
  headerData,
  categories,
  collections,
  logo,
  navItems,
  categoryTree,
}: HeaderSectionDesktopProps) => {
  return (
    <>
      {/* Desktop Top Row */}
      <div className="hidden sm:block">
        <TopRow />
      </div>

      {/* Desktop Header */}
      <div className="hidden sm:flex max-w-[1280px] mx-auto px-5 gap-16 items-center flex-row justify-between space-x-5">
        <div className="font-medium uppercase my-auto">
          {logo && <Image src={logo.url!} alt="Logo" width={100} height={100} priority />}
        </div>

        <div className="flex flex-row flex-1 space-x-8 uppercase font-bold products-font">
          {navItems.map((item) => (
            <Link
              key={item.id}
              href={item.link.url || ''}
              className="text-lg hover:text-primary transition-colors hover:underline"
            >
              {item.link.label}
            </Link>
          ))}
        </div>

        {/* This is the search box of the header section */}
        <div className="hidden md:flex flex-row flex-1 rounded-full bg-white border-gray-700 text-gray-900 max-w-[550px]">
          <HeaderSearchForm
            categories={categories}
            selectClassName="bg-transparent flex-shrink ml-6 focus:outline-none"
            inputClassName="focus:outline-none px-4 py-2 w-full rounded-full"
            buttonClassName="focus:outline-none px-4 py-2"
          />
        </div>
      </div>

      {/* Desktop Bottom Row */}
      <div className="hidden sm:block page-gray-950 text-white">
        <div className="max-w-[1280px] uppercase mx-auto px-5 py-4 flex flex-row justify-between items-center">
          <div className="flex-1">
            <MegaMenu categoryTree={categoryTree} />
          </div>

          <div>
            <ul className="flex flex-row gap-8">
              <li>
                <TfiReload fontSize={20} />
              </li>
              <li>
                <TfiHeart fontSize={20} />
              </li>
              <li>
                <CartIcon variant="desktop" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}
