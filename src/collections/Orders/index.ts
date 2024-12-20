import { isAdmin } from '@/access/isAdmin'
import { isAdminOrCreatedBy } from '@/access/isAdminOrCreatedBy'
import { CollectionConfig } from 'payload'
import { adminsOrOrderedBy } from './access/adminsOrCreatedBy'

const Orders: CollectionConfig = {
  slug: 'orders',
  labels: { plural: 'Pedidos', singular: 'Pedido' },
  admin: {
    useAsTitle: 'id',
    hideAPIURL: true,
  },
  access: {
    read: adminsOrOrderedBy,
    update: adminsOrOrderedBy,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      access: {
        update: isAdmin,
      },
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
    {
      name: 'products',
      type: 'relationship',
      relationTo: 'products',
      hasMany: true,
      required: true,
      access: {
        read: () => true,
      },
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
        { label: 'Pagamento não requerido', value: 'no_payment_required' },
        { label: 'Pago', value: 'paid' },
        { label: 'Não pago', value: 'unpaid' },
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
