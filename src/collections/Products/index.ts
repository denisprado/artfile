import { isAdmin } from '@/access/isAdmin'
import { isAdminOrVendor } from '@/access/isAdminOrVendor'
import { isAdminOrVendorAndCreatedBy } from '@/access/isAdminOrVendorAndCreatedBy'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
  slug: 'products',
  labels: { plural: 'Produtos', singular: 'Produto' },

  access: {
    create: isAdminOrVendor,
    read: isAdminOrVendor,
    update: isAdminOrVendorAndCreatedBy,
    delete: isAdminOrVendorAndCreatedBy,
  },
  admin: {
    useAsTitle: 'name',
    hideAPIURL: true,
    defaultColumns: ['name', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          slug: `/products/${typeof data.doc?.slug === 'string' ? data.doc.slug : ''}`,
          collection: 'products',
        })
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (doc) =>
      generatePreviewPath({
        slug: `/products/${typeof doc?.slug === 'string' ? doc.slug : ''}`,
        collection: 'products',
      }),
  },
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
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Dados',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              access: {
                read: () => true,
              },
            },
            ...slugField('name'),
            {
              name: 'description',
              type: 'textarea',
            },

            {
              name: 'price',
              type: 'number',
              required: true,
            },
            {
              name: 'createdBy',
              type: 'relationship',
              relationTo: 'users',
              required: true,
              access: {
                update: isAdmin,
              },
              admin: {
                position: 'sidebar',
              },
            },
            {
              name: 'categories',
              type: 'relationship',
              admin: {
                position: 'sidebar',
              },

              hasMany: true,
              relationTo: 'categories',
            },
          ],
        },
        {
          label: 'Imagens',
          fields: [
            {
              name: 'thumbnail',
              type: 'upload',
              relationTo: 'media',
              required: true,
            },
            {
              type: 'array',
              name: 'images',
              label: 'Imagens',
              fields: [{ type: 'upload', relationTo: 'media', name: 'images' }],
            },
          ],
        },
        {
          label: 'Arquivos',
          fields: [
            {
              type: 'array',
              name: 'files',
              fields: [
                { type: 'upload', relationTo: 'media', name: 'file' },
                { type: 'text', name: 'title' },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export default Products
