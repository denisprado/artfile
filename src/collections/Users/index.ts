import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { resolveDuplicatePurchases } from './hooks/resolveDuplicatePurchases'

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
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      defaultValue: ['customer'],
      options: [
        {
          label: 'admin',
          value: 'admin',
        },
        {
          label: 'customer',
          value: 'customer',
        },
      ],
    },
    {
      name: 'purchases',
      label: 'Minhas compras',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      hooks: {
        // beforeChange: [resolveDuplicatePurchases],
      },
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
