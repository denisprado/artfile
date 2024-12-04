import { authenticated } from '@/access/authenticated'
import { isAdmin } from '@/access/isAdmin'
import { isAdminOrCreatedBy } from '@/access/isAdminOrCreatedBy'
import { isAdminOrVendor } from '@/access/isAdminOrVendor'
import { isAdminOrVendorAndCreatedBy } from '@/access/isAdminOrVendorAndCreatedBy'
import { slugField } from '@/fields/slug'
import { CollectionConfig } from 'payload'

const Stores: CollectionConfig = {
  slug: 'stores',
  labels: { plural: 'Lojas', singular: 'Loja' },
  access: {
    create: authenticated,
    read: isAdminOrCreatedBy,
    update: isAdminOrCreatedBy,
    delete: isAdminOrCreatedBy,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'logoStore',
      type: 'upload',
      relationTo: 'media',
    },

    {
      name: 'imageHeaderStore',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
        position: 'sidebar',
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === 'published' && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      hasMany: false,
      defaultValue: ({ user }) => {
        return user.id
      },
      access: {
        update: isAdmin,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
        condition: (data) => Boolean(data?.createdBy),
      },
    },
    ...slugField('name'),
  ],
  hooks: {
    beforeChange: [
      ({ req, operation, data }) => {
        if (operation === 'create') {
          if (req.user && !data.createdBy) {
            data.createdBy = req.user.id
            return data
          }
        }
      },
    ],
  },
}

export default Stores
