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

type ProductPageProps = {
	params: { slug: string };
}

const ProductFiles: React.FC<{ product: Product; isPurchased: boolean }> = ({ product, isPurchased }) => {
	if (!product.files || product.files.length === 0) {
		return <p>Esse produto não tem arquivos.</p>
	}

	const fileBaseUrl = process.env.NEXT_PUBLIC_S3_BUCKET_URL || 'https://plato-artfile.s3.us-east-2.amazonaws.com/';

	const numberOfFiles = product.files.length

	const initialNumberOfCols = numberOfFiles < 4 ?
		numberOfFiles === 3 ?
			"col-span-4" :
			numberOfFiles < 3 ?
				"col-span-6" : "col-span-4" :
		"col-span-3"

	return (
		<>
			<h6>Arquivos neste produto</h6>
			<div className='grid grid-cols-12 gap-4'>
				{product.files.map((file) => (

					<a
						key={file.id} className={initialNumberOfCols}
						target='_blank'
						rel='noopener noreferrer'
						href={isPurchased ? `${fileBaseUrl}${(file.file as Media)?.filename}` : '/#'}
					>
						<span className='flex flex-col gap-2'>
							<Image
								src={`/${(file.file as Media)?.sizes?.thumbnail?.filename || ''}`}
								alt={(file.file as Media).filename || 'Imagem do arquivo'}
								width={(file.file as Media)?.sizes?.thumbnail?.width || 100}
								height={(file.file as Media)?.sizes?.thumbnail?.height || 100}
							/>
							{isPurchased ? <span className='flex gap-2 items-center'><DownloadIcon color='green' /><span className='hover:underline'>Baixar</span></span> : <span className='flex gap-2 items-center'><LockIcon color='red' /><span className='hover:underline'>Comprar</span></span>}
							<span className='font-medium text-pretty mb-8'>{file.title} </span>
						</span>
					</a>

				))}
			</div>
		</>
	)
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

			<div className="grid md:grid-cols-2 gap-8">
				<Carrousel product={product} />

				<div>
					<span className="text-3xl font-bold mb-4">{product?.name}</span>
					<p className="text-gray-600 mb-4">{product?.description}</p>
					<p className="text-2xl font-bold mb-4">R$ {product?.price?.toFixed(2)}</p>
					{product?.categories && (
						<div className="mb-4">
							<span className="font-semibold">{categories?.length! > 1 ? "Categorias:" : "Categoria:"}</span> {categories?.join(', ')}
						</div>
					)}

					<ProductFiles product={product} isPurchased={isPurchased} />

					{!isPurchased && <AddToCartButtonWrapper product={product} />}
				</div>
			</div>
		</div>
	)
}

export default ProductPage
