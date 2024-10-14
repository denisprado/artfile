import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Category, Media, Order, Product, User } from '@/payload-types'
import AddToCartButtonWrapper from './AddToCartButtonWrapper'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { getMeUserServer } from '@/utilities/getMeUserServer'
import { DownloadIcon, LockIcon } from 'lucide-react'

export async function generateMetadata({ params }) {
	const payload = await getPayloadHMR({ config: configPromise })
	const product = await payload.find({
		collection: 'products',
		where: { slug: { equals: params.slug } }
	})

	if (!product) return notFound()

	return {
		title: `${product.docs[0].name} - Detalhes do Produto`,
		description: product.docs[0].description as string,
	}
}

const ProductPage = async ({ params }) => {
	const payload = await getPayloadHMR({ config: configPromise })
	const product = await payload.find({
		collection: 'products',
		where: { slug: { equals: params.slug } },
	}).then((res) => res.docs[0] as unknown as Product | null)

	const { user } = await getMeUserServer()

	const userPurchases = user?.purchases as User['purchases']

	const isPurchased = userPurchases?.some(userPurchase => ((userPurchase as Order).products as Product[]).some(prod => prod.id === product?.id))

	if (!product) {
		return notFound()
	}

	const SIZE = 'card'
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

					{product && product.files && product.files?.length! > 0 ? <>
						<h4>Arquivos neste produto</h4>
						<ul className='divide-y p-0'>
							{(product?.files)?.map((file) => {
								return (
									<li key={file.id} className='py-4'>
										<a target='_blank' key={file.id} href={isPurchased ? 'https://plato-artfile.s3.us-east-2.amazonaws.com/' + (file?.file as Media)?.filename : '/#'}>
											<div className='flex gap-2'>{isPurchased ? <DownloadIcon color='green' /> : <LockIcon color='red' />} {file.title} | {(file?.file as Media)?.filename}
											</div>
										</a>
									</li>)
							})}
						</ul>
					</> : <p>Esse produto não tem arquivos.</p>
					}

					{!isPurchased && <AddToCartButtonWrapper product={product} />}
				</div>
			</div>
		</div>
	)
}

export default ProductPage
