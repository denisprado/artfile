import { isAdminOrVendor } from '@/access/isAdminOrVendor'
import { isAdminOrVendorAndCreatedBy } from '@/access/isAdminOrVendorAndCreatedBy copy'
import { slugField } from '@/fields/slug'
import { CollectionConfig } from 'payload'

const Stores: CollectionConfig = {
  slug: 'stores',
  labels: { plural: 'Lojas', singular: 'Loja' },
  access: {
    create: isAdminOrVendor,
    read: isAdminOrVendorAndCreatedBy,
    update: isAdminOrVendorAndCreatedBy,
    delete: isAdminOrVendorAndCreatedBy,
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
      access: {
        update: () => false,
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
          if (req.user) {
            data.createdBy = req.user.id
            return data
          }
        }
      },
    ],
  },
}

export default Stores
