import { Header, Media } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import config from '@payload-config'
import { getPayload } from 'payload'
import { HeaderSectionClient } from './header-section-client'

const payload = await getPayload({ config })

export const HeaderSection = async () => {
  const headerData = (await getCachedGlobal('header', 1)()) as Header

  const categories = await payload.find({
    collection: 'categories',
    select: {
      title: true,
      slug: true,
    },
    limit: 10,
  })

  const collections = headerData.collectionItems || []

  if (!headerData.navItems) {
    console.log('there are no navItems set in admin')
  }

  const logo = headerData.logo as Media
  const navItems = headerData.navItems || []

  return (
    <HeaderSectionClient
      headerData={headerData}
      categories={categories.docs}
      collections={collections}
      logo={logo}
      navItems={navItems}
    />
  )
}
