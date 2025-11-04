import type { GlobalAfterChangeHook } from "payload";

import { revalidateTag } from "next/cache";

export const revalidateQuickLinks: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating quick links`);

    revalidateTag("global_quickLinks", 'default');
  }

  return doc;
};
