import type { CategoryTreeNode } from '@/lib/client/types'
import { Header, Media } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderSectionClient } from './header-section-client'

export const HeaderSection = async () => {
  const headerData = (await getCachedGlobal('header', 1)()) as Header

  // Create empty category tree for header search dropdown
  const categories: Array<{ slug: string; name: string }> = []

  const collections = headerData.collectionItems || []

  if (!headerData.navItems) {
    console.log('there are no navItems set in admin')
  }

  const logo = headerData.logo as Media
  const navItems = headerData.navItems || []

  return (
    <HeaderSectionClient
      headerData={headerData}
      categories={categories}
      collections={collections}
      logo={logo}
      navItems={navItems}
      categoryTree={[] as CategoryTreeNode[]}
    />
  )
}
