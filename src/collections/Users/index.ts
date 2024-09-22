import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  access: {
    create: () => true,
    read: () => true,
    update: () => true,
    delete: () => true,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'isVendor',
      type: 'checkbox',
      label: 'É vendedor?',
    },
    {
      name: 'vendorDetails',
      type: 'group',
      fields: [
        {
          name: 'cpfCnpj',
          type: 'text',
          label: 'CPF/CNPJ',
        },
        {
          name: 'bankInfo',
          type: 'textarea',
          label: 'Informações bancárias',
        },
      ],
      admin: {
        condition: (data) => data.isVendor,
      },
    },
  ],
}

export default Users
