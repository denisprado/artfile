import type { CollectionAfterLogoutHook, CollectionConfig } from 'payload'

import { isAdmin } from '@/access/isAdmin'
import adminsAndUser from './access/adminsAndUser'
import adminsOrNotUnauthenticated from './access/adminsOrNotUnauthenticated'
import { resolveDuplicatePurchases } from './hooks/resolveDuplicatePurchases'
import type { CollectionAfterLoginHook } from 'payload'

const afterLoginHook: CollectionAfterLoginHook = async ({ user, token }) => {}

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
    afterLogin: [afterLoginHook],
    // afterLogout: [afterLogoutHook],
  },

  auth: true,
  access: {
    create: adminsOrNotUnauthenticated,
    read: () => true,
    update: adminsAndUser,
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
