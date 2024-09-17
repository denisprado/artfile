import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Metadata } from 'next'
import { Product, Store } from '@/payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { PaginatedDocs } from 'node_modules/payload/dist/database/types'

type Props = {
	params: {
		slug: string
	}
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const payload = await getPayloadHMR({ config: configPromise })

	const store = await payload.find({
		collection: 'stores',
		where: {
			id: { equals: params.slug },
		},
	})

	if (!store) return {}

	return {
		title: `${store?.docs[0]?.name} - Loja`,
		description: store?.docs[0]?.description as string,
	}
}

const StorePage: React.FC<Props> = async ({ params }) => {
	const payload = await getPayloadHMR({ config: configPromise })

	const storeFull = (await payload.find({
		collection: 'stores',
		where: {
			id: { equals: params.slug },
		},
		depth: 1,
	})) as PaginatedDocs<Store>

	if (!storeFull) return notFound()
	const store = storeFull.docs[0]
	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">{store?.name}</h1>
			<p className="mb-8">{store?.description}</p>

			<h2 className="text-2xl font-semibold mb-4">Produtos</h2>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{store?.products && store?.products.length > 0 ? (
					store?.products.map((product: Product) => (
						<div key={product.id} className="border rounded-lg p-4">
							<h3 className="text-xl font-semibold mb-2">{product?.name}</h3>
							<p className="text-gray-600 mb-2">{product?.description}</p>
							<p className="font-bold">R$ {product?.price.toFixed(2)}</p>
							<Link
								href={`/products/${product?.id}`}
								className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
							>
								Ver detalhes
							</Link>
						</div>
					))
				) : (
					<p>Nenhum produto disponível nesta loja.</p>
				)}
			</div>
		</div>
	)
}

export default StorePage

export async function generateStaticParams() {
	const payload = await getPayloadHMR({ config: configPromise })
	const stores = await payload.find({
		collection: 'stores',
		limit: 100, // Ajuste conforme necessário
	})

	return stores.docs.map((store) => ({
		storeId: store.id,
	}))
}
