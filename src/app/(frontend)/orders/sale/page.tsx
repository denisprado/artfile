import type { Metadata } from 'next/types'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import { Product, User } from '@/payload-types'
import { getMeUserServer } from '@/utilities/getMeUserServer'
import { CollectionArchive } from '@/components/CollectionArchive'
import PageContainer from '@/components/PageContainer'
import { TabsField } from '@payloadcms/ui'
import formattedDate from '@/utilities/formatDate'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DataTable } from './data-table'
import { columns } from './columns'
// export const dynamic = 'force-static'
export const revalidate = 600
const COLLECTION = 'orders'
export default async function Page() {
	const payload = await getPayloadHMR({ config: configPromise })

	const { user } = await getMeUserServer()

	const orders = await payload.find({
		collection: COLLECTION,
		depth: 2,
		where: {
			'products.createdBy.id': {
				equals: user?.id
			}
		}
	})

	// Reorganiza as ordens em duas arrays
	const paidOrders = orders.docs.filter(order => order.status === 'paid');
	const unpaidOrders = orders.docs.filter(order => order.status === 'unpaid');

	const listProducts = (products: Product[]) => {
		return (
			<ul>
				{products.map(product => <li>{product.name} - {product.price}</li>)}
			</ul>
		)
	}

	return (
		<PageContainer>
			<div className="container mb-16">
				<div className="prose dark:prose-invert max-w-none">
					<h1>Minhas vendas</h1>
				</div>
			</div>

			{/* <div className="container mb-8">
				<PageRange
					collection={COLLECTION}
					currentPage={orders.page}
					limit={12}
					totalDocs={orders.totalDocs}
				/>
			</div> */}
			<div className="container mb-8">
				<DataTable columns={columns} data={orders.docs} />
			</div>
			{/* {<p>USer: {user?.id}</p>}
			{orders.docs.map(order => {
				return <p key={order.id}>{order.id} - {myOrders.map(order => <span key={order.id}>{(order.createdBy as User)?.id}</span>)}</p>
			})} */}

		</PageContainer>
	)
}

export function generateMetadata(): Metadata {
	return {
		title: `ArtFile - compra e venda de arquivos`,
	}
}
