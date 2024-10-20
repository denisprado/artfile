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
import Carrousel from '@/components/Carrousel'
import CollectionProductFiles from '@/components/CollectionProductFiles'

type ProductPageProps = {
	params: { slug: string };
}



export async function generateMetadata({ params }: ProductPageProps) {
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

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
	const payload = await getPayloadHMR({ config: configPromise })
	const product = await payload.find({
		collection: 'products',
		where: { slug: { equals: params.slug } },
	}).then((res) => res.docs[0] as unknown as Product | null)

	const { user } = await getMeUserServer()
	const userPurchases = user?.purchases as User['purchases']

	// Garantindo que isPurchased seja sempre um booleano
	const isPurchased = userPurchases?.some(userPurchase =>
		((userPurchase as Order).products as Product[]).some(prod => prod.id === product?.id)
	) ?? false; // Se for undefined, assume false

	if (!product) {
		return notFound()
	}

	const categories = (product.categories as Product['categories'])?.map(cat => { return (cat as Category).title })

	return (
		<div className="container mx-auto px-4 py-8">

			<div className="grid grid-cols-1 sm:grid-cols-12 gap-20">
				<div className='col-span-7'>
					<Carrousel product={product} />
				</div>
				<div className='col-span-5'>
					<span className="text-3xl font-bold mb-4">{product?.name}</span>
					<p className="text-gray-600 mb-4">{product?.description}</p>
					<p className="text-2xl font-bold mb-4">R$ {product?.price?.toFixed(2)}</p>
					{product?.categories && (
						<div className="mb-4">
							<span className="font-semibold">{categories?.length! > 1 ? "Categorias:" : "Categoria:"}</span> {categories?.join(', ')}
						</div>
					)}

					<CollectionProductFiles product={product} isPurchased={isPurchased} />

					{!isPurchased && <AddToCartButtonWrapper product={product} />}
				</div>
			</div>
		</div>
	)
}

export default ProductPage
