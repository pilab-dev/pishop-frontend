import config from '@payload-config'
import { getPayload } from 'payload'

export const getPageFooter = async () => {
  const payload = await getPayload({ config })
  const footerReponse = payload.findGlobal({
    slug: 'footer',
  })

  return (await footerReponse).navItems
}

