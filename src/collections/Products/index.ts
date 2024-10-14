import { isAdminOrVendor } from '@/access/isAdminOrVendor'
import { isAdminOrVendorAndCreatedBy } from '@/access/isAdminOrVendorAndCreatedBy copy'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionConfig } from 'payload'

const Products: CollectionConfig = {
  slug: 'products',
  labels: { plural: 'Produtos', singular: 'Produto' },

  access: {
    create: isAdminOrVendor,
    read: isAdminOrVendorAndCreatedBy,
    update: isAdminOrVendorAndCreatedBy,
    delete: isAdminOrVendorAndCreatedBy,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data }) => {
        const path = generatePreviewPath({
          path: `/products/${typeof data?.slug === 'string' ? data.slug : ''}`,
        })
        return `${process.env.NEXT_PUBLIC_SERVER_URL}${path}`
      },
    },
    preview: (doc) =>
      generatePreviewPath({ path: `/products/${typeof doc?.slug === 'string' ? doc.slug : ''}` }),
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
                update: () => false,
              },
              admin: {
                readOnly: true,
                position: 'sidebar',
                condition: (data) => Boolean(data?.createdBy),
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
