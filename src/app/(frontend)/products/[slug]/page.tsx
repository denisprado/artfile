import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Category, Media, Product } from '@/payload-types'
import AddToCartButtonWrapper from './AddToCartButtonWrapper'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
type Props = {
	params: {
		slug: string
	}
}

export async function generateMetadata({ params }: Props) {
	const payload = await getPayloadHMR({ config: configPromise })
	const product = await payload.find({
		collection: 'products',
		where: { slug: { equals: params.slug } }
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
		where: { slug: { equals: params.slug } }
	}).then((res) => res.docs[0] as unknown as Product | null)

	if (!product) {
		return notFound()
	}
	const SIZE = 'card'
	console.log(product)
	const imgProduct = (product.thumbnail as Media)?.sizes?.[SIZE]?.filename


	const imageUrlToUse =
		product ? "/" + imgProduct : '/media/artfile-logo.svg'

	const widthToUSe = product && imgProduct ? (product.thumbnail as Media)?.sizes?.[SIZE]?.width : 500

	const heightToUSe = product && imgProduct ? (product.thumbnail as Media).sizes?.[SIZE]?.height : 500


	const categories = (product.categories as Product['categories'])?.map(cat => { return (cat as Category).title })

	return (
		<div className="container mx-auto px-4 py-8">

			<div className="grid md:grid-cols-2 gap-8">
				<div>
					{product.thumbnail && (
						<Image
							src={imageUrlToUse}
							alt={product?.name!}
							className="w-full h-auto rounded-lg shadow-lg"
							width={widthToUSe!}
							height={heightToUSe!}
							objectFit='cover'
						/>
					)}
				</div>

				<div>
					<h1 className="text-3xl font-bold mb-4">{product?.name}</h1>
					<p className="text-gray-600 mb-4">{product?.description}</p>
					<p className="text-2xl font-bold mb-4">R$ {product?.price?.toFixed(2)}</p>
					{product?.categories && (
						<div className="mb-4">
							<span className="font-semibold">Categorias:</span> {categories?.join(', ')}
						</div>
					)}

					<AddToCartButtonWrapper product={product} />
				</div>
			</div>
		</div>
	)
}

export default ProductPage
