import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { isAdmin } from '@/access/isAdmin'
import { isAdminOrCreatedBy } from '@/access/isAdminOrCreatedBy'
import { slugField } from '@/fields/slug'

const Categories: CollectionConfig = {
  slug: 'categories',
  labels: { plural: 'Categorias', singular: 'Categoria' },

  access: {
    create: authenticated,
    delete: isAdmin,
    read: anyone,
    update: isAdminOrCreatedBy,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
    {
      name: 'stick',
      type: 'checkbox',
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      access: {
        update: () => false,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) => Boolean(data?.createdBy),
      },
    },
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          if (req.user) {
            data.createdBy = req.user.id
            return data
          }
        }
      },
    ],
  },
}

export default Categories
