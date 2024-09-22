import { isAdmin } from '@/access/isAdmin'
import { isAdminOrCreatedBy } from '@/access/isAdminOrCreatedBy'
import { CollectionConfig } from 'payload'

const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: isAdminOrCreatedBy,
    update: isAdminOrCreatedBy,
    delete: isAdmin,
  },
  fields: [
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
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: true,
    },
    {
      name: 'totalAmount',
      type: 'number',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Pendente', value: 'pending' },
        { label: 'Pago', value: 'paid' },
        { label: 'Entregue', value: 'delivered' },
      ],
      required: true,
    },
    {
      name: 'paymentId',
      type: 'text',
    },
  ],
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
}

export default Orders
