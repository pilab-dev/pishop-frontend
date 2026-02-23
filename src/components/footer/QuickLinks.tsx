import { Header } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import { FC } from 'react'
import { CMSLink } from '../Link'
import { FancyTitle } from '../fancy-title'

type MenuItem = {
  title: string
  path: string
}

type QuickLinksProps = {
  categories: MenuItem[]
}

export const QuickLinks: FC<QuickLinksProps> = async () => {
  const headerData = (await getCachedGlobal('header', 1)()) as Header
  const navItems = headerData.navItems || []
  const collections = headerData.collectionItems || []

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
            {collections.map((collection) => (
              <li className="list-item" key={collection.collection}>
                <Link href={`/collections/${collection.collection}`}>{collection.label}</Link>
              </li>
            ))}
          </ul>

          <ul
            className="list list-outside space-y-3 text-sm md:text-base text-right
          md:text-left
          "
          >
            {navItems.map(({ link }, index) => (
              <li className="list-item" key={link.label}>
                <CMSLink {...link} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* <!-- Customer Care --> */}
      <div>
        <h3 className="font-bold text-lg md:text-xl mb-5 uppercase">
          <FancyTitle label="Customer Care" />
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

