import { notFound, redirect } from 'next/navigation'
import React from 'react'

import { CollectionArchive } from '@/components/CollectionArchive'
import { Product, Store } from '@/payload-types'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Metadata } from 'next'
import { PaginatedDocs } from 'node_modules/payload/dist/database/types'




const COLLECTION = 'products'
export async function generateMetadata(props): Promise<Metadata> {
    const params = await props.params;
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

const StorePage = async props => {
    const params = await props.params;
    const payload = await getPayloadHMR({ config: configPromise })

    redirect(`/stores/${params.slug}/cat/all`)
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
