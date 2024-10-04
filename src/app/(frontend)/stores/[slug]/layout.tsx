import { notFound } from 'next/navigation'

import CategoriesMenu from '@/components/CategoriesMenu'
import { Category, Media, Product, Store } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Metadata } from 'next'
import Image from 'next/image'
import { PaginatedDocs } from 'node_modules/payload/dist/database/types'


const COLLECTION = 'products'
export async function generateMetadata({ params }): Promise<Metadata> {
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

const StorePageLayout = async ({ params, children }) => {
	const payload = await getPayloadHMR({ config: configPromise })


	const storeFull = (await payload.find({
		collection: 'stores',
		where: {
			slug: { equals: params.slug },
		},
		depth: 2,
	})) as PaginatedDocs<Store>

	const categoriesWithProducts = storeFull.docs[0]?.products



	const uniqueCategoryNames = Array.from(new Set(categoriesWithProducts && categoriesWithProducts.flatMap(product =>
		(product as Product)?.categories?.map(category => ({
			title: (category as Category).title,
			slug: (category as Category).slug
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
