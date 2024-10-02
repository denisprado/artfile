import { notFound } from 'next/navigation'
import React from 'react'

import { Category, Media, Product, Store } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Metadata } from 'next'
import Image from 'next/image'
import { PaginatedDocs } from 'node_modules/payload/dist/database/types'
import { Button } from '@/components/Button'
import Link from 'next/link'
import CategoriesMenu, { Cat } from '@/components/CategoriesMenu'


type Props = {
	params: {
		slug: string
	},
	children: React.ReactNode
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

const StorePageLayout: React.FC<Props> = async ({ params, children }) => {
	const payload = await getPayloadHMR({ config: configPromise })


	const storeFull = (await payload.find({
		collection: 'stores',
		where: {
			slug: { equals: params.slug },
		},
		depth: 2,
	})) as PaginatedDocs<Store>

	const categoriesWithProducts = storeFull.docs[0]?.products

	function getSubstring(str, char) {
		const lastIndex = str.firstIndexOf(char);
		const slugFinal = lastIndex !== -1 ? str.substring(lastIndex + 1) : str;
		return slugFinal
	}

	const uniqueCategoryNames = Array.from(new Set(categoriesWithProducts && categoriesWithProducts.flatMap(product =>
		(product as Product)?.categories?.map(category => ({
			title: (category as Category).title,
			slug: params.slug?.includes('/cat/') ? (category as Category).slug : params.slug + '/cat/' + (category as Category).slug
		}))
	))).map(category => category); // Remover duplicatas

	if (!storeFull) return notFound()
	const store = storeFull.docs[0]
	return (
		<div className="container mx-auto px-4">
			<div className='relative w-full h-80'>
				<Image src={"/" + (store?.imageHeaderStore as Media)?.sizes?.widthFull?.filename!} alt={store?.name} fill objectFit='cover' ></Image>
				<div className='absolute w-32 h-32 left-6 -bottom-12'>

					<Image src={"/" + (store?.logoStore as Media)?.sizes!.thumbnail?.filename} alt={store?.name} fill objectFit='cover' className='rounded-full border-4 border-white'></Image>
				</div>
			</div>
			<h1 className="text-3xl font-bold mt-16 mb-6">{store?.name}</h1>
			<p className="mb-8">{store?.description}</p>

			<div className='grid grid-cols-12 gap-8'>
				<div className='col-span-3'>
					<div className="mb-8">
						<div className="prose dark:prose-invert max-w-none">
							<h3>Categorias</h3>
						</div>
					</div>
					<div className='flex justify-start flex-col'>
						{uniqueCategoryNames && <CategoriesMenu uniqueCategoryNames={uniqueCategoryNames} />}
					</div>
				</div>
				<div className='col-span-9'>
					<div className="mb-8">
						<div className="prose dark:prose-invert max-w-none">
							<h3>Produtos</h3>
						</div>
					</div>
					{children}
				</div>
			</div>
		</div >
	)
}

export default StorePageLayout

export async function generateStaticParams() {
	const payload = await getPayloadHMR({ config: configPromise })
	const stores = await payload.find({
		collection: 'stores',
		limit: 100, // Ajuste conforme necessário
	})

	return stores.docs.map((store) => ({
		storeId: store?.id,
	}))
}
