import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { resolveDuplicatePurchases } from './hooks/resolveDuplicatePurchases'
import { isAdmin } from '@/access/isAdmin'
import adminsAndUser from './access/adminsAndUser'

const Users: CollectionConfig = {
  slug: 'users',
  labels: { plural: 'Usuários', singular: 'Usuário' },

  auth: true,
  access: {
    create: () => true,
    read: adminsAndUser,
    update: adminsAndUser,
    delete: isAdmin,
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
          label: 'Consumidor',
          value: 'customer',
        },
        {
          label: 'Vendedor',
          value: 'vendor',
        },
      ],
    },
    {
      name: 'stripe',
      type: 'text',
    },
    {
      name: 'detailsSubmited',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'purchases',
      label: 'Minhas compras',
      type: 'relationship',
      relationTo: 'orders',
      hasMany: true,
      hooks: {
        beforeChange: [resolveDuplicatePurchases],
      },
    },
  ],
}

export default Users
