import { isAdmin } from '@/access/isAdmin'
import { isAdminOrCreatedBy } from '@/access/isAdminOrCreatedBy'
import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionConfig } from 'payload'
import { title } from 'process'

const Products: CollectionConfig = {
  slug: 'products',
  access: {
    read: isAdminOrCreatedBy,
    update: isAdminOrCreatedBy,
    delete: isAdminOrCreatedBy,
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
          label: 'Imagens',
          fields: [
            {
              type: 'array',
              name: 'images',
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
              fields: [{ type: 'upload', relationTo: 'media', name: 'files' }],
            },
          ],
        },
        {
          label: 'Dados',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
            },
            ...slugField('name'),
            {
              name: 'description',
              type: 'textarea',
            },
            {
              name: 'fileArt',
              type: 'upload',
              relationTo: 'media',
              required: true,
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
      ],
    },
  ],
}

export default Products
