import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Category, Media, Order, Product } from '@/payload-types'

import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { CollectionArchive } from '@/components/CollectionArchive'
type Props = {
	params: {
		id: string
	}
}

const ProductPage = async ({ params }: Props) => {
	const payload = await getPayloadHMR({ config: configPromise })
	const order = await payload.find({
		collection: 'orders',
		where: { id: { equals: params.id } }
	}).then((res) => res.docs[0] as unknown as Order | null)

	if (!order) {
		return notFound()
	}


	return (
		<div className="container mx-auto px-4 py-8">


			<div className="grid md:grid-cols-2 gap-8">

				<div>
					<h1 className="text-3xl font-bold mb-4">{order?.id}</h1>
					<p className="text-gray-600 mb-4">{order?.createdAt}</p>
					<CollectionArchive relationTo={'products'} items={order.products as Product[]} />
				</div>
			</div>
		</div>
	)
}

export default ProductPage
