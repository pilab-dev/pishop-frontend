import { Footer, Media } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { CopyrightSection } from './footer/CopyrightSection'
import { FooterContactSection } from './footer/FooterContactSection'
import { QuickLinks } from './footer/QuickLinks'
import { SubscribeForm } from './ui/subscribe-form'

type MenuItem = {
  title: string
  path: string
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
        <div className="mx-auto px-5 my-5 md:px-12 md:my-12 w-full max-w-7xl">
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
              <QuickLinks categories={categories} />
            </div>
          </div>
        </div>
      </div>
      <CopyrightSection copyright={footerData?.copy || ''} />
    </footer>
  )
}
