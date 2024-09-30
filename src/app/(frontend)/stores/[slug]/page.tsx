import React from 'react'
import { notFound } from 'next/navigation'

import { Metadata } from 'next'
import { Category, Media, Product, Store } from '@/payload-types'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import configPromise from '@payload-config'
import { PaginatedDocs } from 'node_modules/payload/dist/database/types'
import Image from 'next/image'
import { PageRange } from '@/components/PageRange'
import { CollectionArchive } from '@/components/CollectionArchive'
import { CMSLink } from '@/components/Link'

type Props = {
	params: {
		slug: string
	}
}


const COLLECTION = 'products'
export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const payload = await getPayloadHMR({ config: configPromise })

	const store = await payload.find({
		collection: 'stores',
		where: {
			slug: { equals: params.slug },
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
			slug: { equals: params.slug },
		},
		depth: 2,
	})) as PaginatedDocs<Store>
	console.log(storeFull)
	const categoriesWithProducts = storeFull.docs[0].products

	const uniqueCategoryNames = Array.from(new Set(categoriesWithProducts && categoriesWithProducts.flatMap(product => product && (product as Product)?.categories && (product as Product).categories?.map(category => (category as Category)?.title))))

	if (!storeFull) return notFound()
	const store = storeFull.docs[0]
	return (
		<div className="container mx-auto px-4">
			<div className='relative w-full h-80'>
				<Image src={(store?.header as Media)?.url!} alt={store.name} fill objectFit='cover' ></Image>
				<div className='absolute w-32 h-32 left-6 -bottom-12'>

					<Image src={(store?.logo as Media)?.url!} alt={store.name} fill objectFit='cover' className='rounded-full border-4 border-white'></Image>
				</div>
			</div>
			<h1 className="text-3xl font-bold mt-16 mb-6">{store?.name}</h1>
			<p className="mb-8">{store?.description}</p>

			<div className='grid grid-cols-12'>
				<div className='col-span-3'>
					<div className="mb-16">
						<div className="prose dark:prose-invert max-w-none">
							<h2>Categorias</h2>
						</div>
					</div>
					<ul>
						{uniqueCategoryNames.map((category) => (
							<li key={category}><h2>{category}</h2></li>
						))}
					</ul>
				</div>
				<div className='col-span-9'>
					<div className="mb-16">
						<div className="prose dark:prose-invert max-w-none">
							<h2>Produtos</h2>
						</div>
					</div>
					{store.products ? <CollectionArchive relationTo={COLLECTION} items={store.products as Product[]} container={false} /> : <>Essa loja ainda não tem nenhum produto</>}
				</div>
			</div>
		</div >
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
