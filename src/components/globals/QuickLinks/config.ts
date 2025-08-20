import type { GlobalConfig } from "payload";

import { link } from "@/fields/link";
import { revalidateFooter } from "@/Footer/hooks/revalidateFooter";

export const QuickLinks: GlobalConfig = {
  slug: "quickLinks",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "navItems",
      type: "array",
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: "@/Footer/RowLabel#RowLabel",
        },
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
};
