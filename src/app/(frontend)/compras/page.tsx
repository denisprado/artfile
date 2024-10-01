import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'

export const dynamic = 'force-static'
export const revalidate = 600
const COLLECTION = 'orders'
export default async function Page() {
	const payload = await getPayloadHMR({ config: configPromise })

	const orders = await payload.find({
		collection: COLLECTION,
		depth: 2,
		limit: 12,
	})

	console.log(orders)

	return (
		<div className="pt-24 pb-24">
			<div className="container mb-16">
				<div className="prose dark:prose-invert max-w-none">
					<h1>MInhas compras</h1>
				</div>
			</div>

			<div className="container mb-8">
				<PageRange
					collection={COLLECTION}
					currentPage={orders.page}
					limit={12}
					totalDocs={orders.totalDocs}
				/>
			</div>

			<CollectionArchive relationTo={COLLECTION} items={orders.docs} />

			<div className="container">
				{orders.totalPages > 1 && orders.page && (
					<Pagination page={orders.page} totalPages={orders.totalPages} />
				)}
			</div>
		</div>
	)
}

export function generateMetadata(): Metadata {
	return {
		title: `ArtFile - compra e venda de arquivos`,
	}
}
