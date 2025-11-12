'use client'

import type { CategoryTreeNode } from '@/lib/client/types'
import { Header, Media } from '@/payload-types'
import { HeaderSectionDesktop } from './header-section-desktop'
import { HeaderSectionMobile } from './header-section-mobile'

interface HeaderSectionClientProps {
  headerData: Header
  categories: any[]
  collections: any[]
  logo: Media
  navItems: any[]
  categoryTree: CategoryTreeNode[]
}

export const HeaderSectionClient = ({
  headerData,
  categories,
  collections,
  logo,
  navItems,
  categoryTree,
}: HeaderSectionClientProps) => {
  return (
    <div className="top-0 z-50 w-full page-gray-800">
      {/* Mobile Header */}
      <HeaderSectionMobile
        headerData={headerData}
        categories={categories}
        collections={collections}
        logo={logo}
        navItems={navItems}
      />

      {/* Desktop Header */}
      <HeaderSectionDesktop
        headerData={headerData}
        categories={categories}
        collections={collections}
        logo={logo}
        navItems={navItems}
        categoryTree={categoryTree}
      />
    </div>
  )
}
