import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { resolveDuplicatePurchases } from './hooks/resolveDuplicatePurchases'
import { isAdmin } from '@/access/isAdmin'
import adminsAndUser from './access/adminsAndUser'
import adminsOrNotUnauthenticated from './access/adminsOrNotUnauthenticated'

const Users: CollectionConfig = {
  slug: 'users',
  labels: { plural: 'Usuários', singular: 'Usuário' },

  auth: true,
  access: {
    create: adminsOrNotUnauthenticated,
    read: adminsAndUser,
    update: adminsAndUser,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'purchases'],
  },

  fields: [
    {
      label: 'Nome',
      name: 'name',
      type: 'text',
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      label: 'Tipo de usuário',
      name: 'roles',
      type: 'select',
      hasMany: true,
      access: {
        update: isAdmin,
      },
      admin: {
        position: 'sidebar',
      },
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
      access: {
        update: isAdmin,
      },
      admin: {
        position: 'sidebar',
      },
    },
    {
      label: 'Dados bancários enviados',
      name: 'detailsSubmited',
      type: 'checkbox',
      defaultValue: false,
      access: {
        update: isAdmin,
      },
      admin: {
        position: 'sidebar',
      },
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
