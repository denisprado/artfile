import type { Metadata } from 'next/types'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import { User } from '@/payload-types'
import { getMeUserServer } from '@/utilities/getMeUserServer'
import { CollectionArchive } from '@/components/CollectionArchive'

// export const dynamic = 'force-static'
export const revalidate = 600
const COLLECTION = 'orders'
export default async function Page() {
	const payload = await getPayloadHMR({ config: configPromise })

	const { user } = await getMeUserServer()
	const orders = await payload.find({
		collection: COLLECTION,
		depth: 2,
		limit: 12,
		where: {
			'createdBy.id': {
				equals: user?.id
			}
		}
	})

	const myOrders = orders?.docs?.filter(order => {
		const createdById = (order && order.createdBy as User)?.id; // Certifique-se de que isso está correto
		return createdById === user?.id; // Comparação de IDs
	}) || [] // Adicionando um fallback para evitar undefined

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
			{/* {<p>USer: {user?.id}</p>}
			{orders.docs.map(order => {
				return <p key={order.id}>{order.id} - {myOrders.map(order => <span key={order.id}>{(order.createdBy as User)?.id}</span>)}</p>
			})} */}

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
