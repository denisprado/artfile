import { Order, Product } from '@/payload-types'
import { notFound } from 'next/navigation'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

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
	const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()} - ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;


	return (
		<div className="container mx-auto px-4 py-8">
			<div>
				<h1 className="text-3xl font-bold mb-4">Produtos inclusos na compra nº&nbsp;{order?.id}</h1>
				<p className="text-gray-600 mb-4">{formattedDate}</p>
				<CollectionArchive relationTo={'products'} items={order.products as Product[]} />
			</div>

		</div>
	)
}

export default OrderPage
