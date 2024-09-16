import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import payload from 'payload'
import { Media, Product } from '@/payload-types'
import AddToCartButtonWrapper from './AddToCartButtonWrapper'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
type Props = {
	params: {
		productId: string
	}
}

export async function generateMetadata({ params }: Props) {
	const payload = await getPayloadHMR({ config: configPromise })
	const product = await payload.find({
		collection: 'products',
		where: { id: { equals: params.productId } }
	}) as unknown as Product | null

	if (!product) return notFound()

	return {
		title: `${product.name} - Detalhes do Produto`,
		description: product.description as string,
	}
}

const ProductPage = async ({ params }: Props) => {
	const payload = await getPayloadHMR({ config: configPromise })
	const product = await payload.find({
		collection: 'products',
		where: { id: { equals: params.productId } }
	}).then((res) => res.docs[0] as unknown as Product | null)

	if (!product) {
		return notFound()
	}

	return (
		<div className="container mx-auto px-4 py-8">
			<Link href="/products" className="text-blue-500 hover:underline mb-4 inline-block">
				&larr; Voltar para a loja
			</Link>

			<div className="grid md:grid-cols-2 gap-8">
				<div>
					{product.file && (
						<img
							src={(product?.file as Media).filename!}
							alt={product?.name!}
							className="w-full h-auto rounded-lg shadow-lg"
						/>
					)}
				</div>

				<div>
					<h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
					<p className="text-gray-600 mb-4">{product?.description}</p>
					<p className="text-2xl font-bold mb-4">R$ {product?.price?.toFixed(2)}</p>

					<div className="mb-4">
						<span className="font-semibold">Categoria:</span> {product?.category}
					</div>

					<AddToCartButtonWrapper product={product} />
				</div>
			</div>
		</div>
	)
}

export default ProductPage
