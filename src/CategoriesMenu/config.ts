import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateHeader } from './hooks/revalidateHeader'
import { isAdmin } from '@/access/isAdmin'

export const CategoriesMenu: GlobalConfig = {
  slug: 'categoriesMenu',
  access: {
    read: isAdmin,
  },
  fields: [
    {
      name: 'showStick',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'showOther',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'showGlobal',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
}
