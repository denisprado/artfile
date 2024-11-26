import { notFound } from 'next/navigation'
import React from 'react'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Category, Product, Store } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Metadata } from 'next'
import { PaginatedDocs } from 'node_modules/payload/dist/database/types'

const COLLECTION = 'products'
export async function generateMetadata(props): Promise<Metadata> {
	const params = await props.params;

	const payload = await getPayload({ config: configPromise })



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

const StorePage = async props => {
	const params = await props.params;
	const payload = await getPayload({ config: configPromise })

	const storeFull = (await payload.find({
		collection: 'stores',
		where: {
			slug: { equals: params.slug },
		},
		depth: 3,
	})) as PaginatedDocs<Store>

	if (!storeFull) return notFound()

	const store = storeFull.docs[0]
	const catSlug = params.cat

	const filteredProducts = catSlug === 'all' ? store?.products : store?.products?.filter(product =>
		(product as Product).categories?.some(category => (category as Category).slug === params.cat)
	) as Product[];

	return (
		<>
			{filteredProducts ? <CollectionArchive relationTo={COLLECTION} items={filteredProducts as Product[]} container={false} /> : <>Essa loja ainda não tem nenhum produto</>}
		</>

	)
}

export default StorePage

export async function generateStaticParams() {
	const payload = await getPayload({ config: configPromise })
	const stores = await payload.find({
		collection: 'stores',
		limit: 100, // Ajuste conforme necessário
	})

	return stores.docs.map((store) => ({
		storeId: store.id,
	}))
}
