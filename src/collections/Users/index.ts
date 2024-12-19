import type { CollectionConfig } from 'payload'

import { isAdmin } from '@/access/isAdmin'
import adminsAndUser from './access/adminsAndUser'
import adminsOrNotUnauthenticated from './access/adminsOrNotUnauthenticated'
import { resolveDuplicatePurchases } from './hooks/resolveDuplicatePurchases'
import { authenticated } from '@/access/authenticated'

// const afterLogoutHook: CollectionAfterLogoutHook = async ({ collection, context, req }) => {
//   console.log(process.env.NEXT_PUBLIC_SERVER_URL)
//   NextResponse.rewrite(process.env.NEXT_PUBLIC_SERVER_URL!)
//   NextResponse.redirect(process.env.NEXT_PUBLIC_SERVER_URL!)
//   redirect(process.env.NEXT_PUBLIC_SERVER_URL!)

// }

const Users: CollectionConfig = {
  slug: 'users',
  labels: { plural: 'Usuários', singular: 'Usuário' },
  hooks: {
    // afterLogin: [afterLoginHook],
    // afterLogout: [afterLogoutHook],
  },

  auth: true,
  access: {
    create: adminsOrNotUnauthenticated,
    read: () => true,
    update: authenticated,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'purchases'],
    hideAPIURL: true,
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
      access: {},
      admin: {
        disabled: true,
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
      access: {},
      admin: {
        disabled: true,
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
