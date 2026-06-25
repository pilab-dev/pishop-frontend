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
const CartIcon = dynamic(() => import('./cart-icon').then((mod) => ({ default: mod.CartIcon })), {
  ssr: false,
  loading: () => <div className="w-4 h-4 animate-pulse rounded" />,
})

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
          <div
            className={cn(
              'sm:hidden fixed left-0 top-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-all duration-300 ease-in-out',
              isMobileMenuOpen
                ? 'translate-x-0 opacity-100'
                : '-translate-x-full opacity-0 pointer-events-none',
            )}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 bg-gray-900 text-white">
              <h2 className="text-lg font-bold uppercase tracking-wider">Menu</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <FaTimes />
              </Button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto h-full pb-20">
              <ul className="flex flex-col w-full">
                {/* Static demo items matching reference functionality */}
                <li className="border-b border-gray-100">
                  <MobileAccordionItem title="Headphone">
                    <ul className="py-1">
                      <li><a href="#" className="block py-2 text-gray-500 hover:text-primary pl-4 border-b border-gray-50">Headphone 1</a></li>
                      <li><a href="#" className="block py-2 text-gray-500 hover:text-primary pl-4 border-b border-gray-50">Headphone 2</a></li>
                      <li><a href="#" className="block py-2 text-gray-500 hover:text-primary pl-4 border-b border-gray-50">Headphone 3</a></li>
                      <li><a href="#" className="block py-2 text-gray-500 hover:text-primary pl-4">Headphone 4</a></li>
                    </ul>
                  </MobileAccordionItem>
                </li>
                <li className="border-b border-gray-100">
                  <MobileAccordionItem title="Smart watch">
                    <ul className="py-1">
                      <li>
                        <MobileAccordionItem title="Laptop" isSubLevel={true}>
                          <ul className="py-1">
                            <li><a href="#" className="block py-2 text-gray-500 hover:text-primary pl-8 border-b border-gray-50">Apple</a></li>
                            <li><a href="#" className="block py-2 text-gray-500 hover:text-primary pl-8 border-b border-gray-50">Samsung</a></li>
                            <li><a href="#" className="block py-2 text-gray-500 hover:text-primary pl-8">Sony</a></li>
                          </ul>
                        </MobileAccordionItem>
                      </li>
                      <li>
                        <MobileAccordionItem title="Accessories" isSubLevel={true}>
                          <ul className="py-1">
                            <li><a href="#" className="block py-2 text-gray-500 hover:text-primary pl-8 border-b border-gray-50">Submenu1</a></li>
                            <li><a href="#" className="block py-2 text-gray-500 hover:text-primary pl-8 border-b border-gray-50">Submenu2</a></li>
                            <li><a href="#" className="block py-2 text-gray-500 hover:text-primary pl-8">Submenu3</a></li>
                          </ul>
                        </MobileAccordionItem>
                      </li>
                    </ul>
                  </MobileAccordionItem>
                </li>
                
                {/* Dynamic Collections from Payload */}
                <li className="border-b border-gray-100">
                  <MobileAccordionItem title="Collections">
                    <ul className="py-1">
                      {collections?.map((collection) => (
                        <li key={collection?.id}>
                          <Link
                            href={`/collections/${collection.collection}`}
                            className="block py-2 text-gray-500 hover:text-primary pl-4 border-b border-gray-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {collection.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </MobileAccordionItem>
                </li>

                {/* Dynamic Nav Items */}
                {navItems.map(({ link }, i) => (
                  <li key={i} className="border-b border-gray-100 block py-3 px-4">
                    <CMSLink
                      className="text-gray-800 hover:text-primary font-medium uppercase text-[13px]"
                      {...link}
                      appearance="inline"
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </>
  )
}

// Local helper component for accordion behavior
const MobileAccordionItem = ({ title, children, isSubLevel = false }: { title: string; children: React.ReactNode; isSubLevel?: boolean }) => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div className="w-full">
      <button 
        className={`w-full flex justify-between items-center py-3 text-gray-800 transition-colors ${isSubLevel ? 'pl-4 pr-4 font-normal' : 'px-4 font-medium uppercase text-[13px]'}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
        <span className="text-lg leading-none font-light text-gray-500">{isOpen ? '-' : '+'}</span>
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <div className="bg-gray-50/50">
          {children}
        </div>
      </div>
    </div>
  )
}
