import { slugField } from '@/fields/slug'
import { generatePreviewPath } from '@/utilities/generatePreviewPath'
import { CollectionConfig } from 'payload'
import { title } from 'process'

const Products: CollectionConfig = {
  slug: 'products',
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
              name: 'seller',
              type: 'relationship',
              relationTo: 'users',
              required: true,
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
