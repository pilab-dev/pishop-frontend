'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Header, Media } from '@/payload-types'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { FaBars, FaSearch, FaTimes } from 'react-icons/fa'
import { TfiHeart, TfiReload } from 'react-icons/tfi'
import { CMSLink } from './Link'

// Dynamically import heavy components to reduce initial bundle size
const AuthPopover = dynamic(
  () => import('./auth/auth-section-top').then((mod) => ({ default: mod.AuthSectionTop })),
  {
    ssr: false,
    loading: () => <div className="w-30 h-6 bg-gray-200 animate-pulse rounded" />,
  },
)
const CartIcon = dynamic(
  () => import('./cart-icon-button').then((mod) => ({ default: mod.CartIconButton })),
  {
    ssr: false,
    loading: () => <div className="w-4 h-4 animate-pulse rounded" />,
  },
)

interface HeaderSectionMobileProps {
  headerData: Header
  categories: any[]
  collections: any[]
  logo: Media
  navItems: any[]
}

export const HeaderSectionMobile = ({
  headerData,
  categories,
  collections,
  logo,
  navItems,
}: HeaderSectionMobileProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  // Close mobile menu on ESC key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (isMobileMenuOpen) setIsMobileMenuOpen(false)
        if (isSearchOpen) setIsSearchOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isMobileMenuOpen, isSearchOpen])

  return (
    <>
      {/* Mobile Header */}
      <div
        id="mobile-header"
        className="sm:hidden w-full flex flex-row justify-between items-center"
      >
        <div className="flex items-center gap-6 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:bg-gray-700"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </Button>
          <div className="font-medium uppercase">
            {logo && <Image src={logo.url!} alt="Logo" width={100} height={100} priority />}
          </div>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="text-white hover:bg-gray-700"
          >
            <FaSearch />
          </Button>
          <AuthPopover />
          <CartIcon variant="mobile" />
        </div>
      </div>

      {/* Mobile Search */}
      {isSearchOpen && (
        <div className="sm:hidden px-5 pb-4" onClick={(e) => e.stopPropagation()}>
          <div className="flex flex-row rounded-full bg-white border border-gray-700 text-gray-900 w-full">
            <select className="bg-transparent flex-shrink ml-4 focus:outline-none text-sm min-w-0">
              <option disabled value="">
                Category
              </option>
              <option value="all">All</option>
              {categories.map((category) => (
                <option key={category.slug} value={category.slug || ''}>
                  {category.name}
                </option>
              ))}
            </select>
            <input
              className="focus:outline-none px-4 py-2 flex-1 rounded-full text-sm"
              placeholder="Search..."
              type="text"
            />
            <button className="focus:outline-none px-4 py-2 flex-shrink-0">
              <FaSearch className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="sm:hidden fixed inset-0 z-40 bg-black/50"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          {/* Drawer */}
          <div
            className={cn(
              'sm:hidden fixed right-0 top-0 z-50 h-full w-80 max-w-[90vw] bg-white shadow-xl transform transition-all duration-300 ease-in-out',
              isMobileMenuOpen
                ? 'translate-x-0 opacity-100'
                : 'translate-x-full opacity-0 pointer-events-none',
            )}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FaTimes />
              </Button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4">
              {/* Navigation Items */}
              <ul className="space-y-4 mb-6">
                {navItems.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink
                      className="block text-gray-900 hover:text-primary transition-colors text-lg font-medium"
                      {...link}
                      appearance="inline"
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  </li>
                ))}
              </ul>

              {/* Collections */}
              <div className="border-t border-gray-200 pt-4">
                <h3 className="text-gray-900 font-semibold uppercase mb-3 text-sm">Collections</h3>
                <ul className="space-y-3">
                  {collections?.map((collection) => (
                    <li key={collection?.id}>
                      <Link
                        href={`/collections/${collection.collection}`}
                        className="block text-gray-700 hover:text-primary transition-colors text-base"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {collection.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Icons */}
              <div className="border-t border-gray-200 pt-4 mt-6">
                <div className="flex justify-around">
                  <button className="text-gray-600 hover:text-primary transition-colors p-2">
                    <TfiReload fontSize={24} />
                  </button>
                  <button className="text-gray-600 hover:text-primary transition-colors p-2">
                    <TfiHeart fontSize={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
