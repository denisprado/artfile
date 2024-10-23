import { Order, Product } from '@/payload-types'
import { notFound } from 'next/navigation'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import formattedDate from '@/utilities/formatDate'
const OrderPage = async ({ params }) => {
	const payload = await getPayloadHMR({ config: configPromise })
	const order = await payload.find({
		collection: 'orders',
		where: { id: { equals: params.id } }
	}).then((res) => res.docs[0] as unknown as Order | null)

	if (!order) {
		return notFound()
	}

	const date = new Date(order.createdAt);
	const formatted = formattedDate(date)

	return (
		<div className="container mx-auto px-4 py-8">
			<div>
				<h1 className="text-3xl font-bold mb-4">Produtos inclusos na compra nº&nbsp;{order?.id}</h1>
				<p className="text-gray-600 mb-4">{formatted}</p>
				<CollectionArchive relationTo={'products'} items={order.products as Product[]} />
			</div>

		</div>
	)
}

export default OrderPage
