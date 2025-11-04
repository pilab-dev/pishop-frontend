import type { GlobalAfterChangeHook } from 'payload'

import { revalidateTag } from 'next/cache'

export const revalidatePromotions: GlobalAfterChangeHook = ({ doc, req: { payload, context } }) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating promotions global`)

    revalidateTag('global_promotions', 'default')
    // Also revalidate homepage since promotions often affect homepage content
    revalidateTag('pages-sitemap', 'default')
  }

  return doc
}
