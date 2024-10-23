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

			<ul className='divide-x space-x-2'>
				{orders.docs.map(order => {
					const date = new Date(order.createdAt);
					const formatted = formattedDate(date)
					return (
						<li key={order.id} >{formatted} - {order.id} - {order.status === 'paid' ? "Pago" : "Não pago"}
							{<div className=''>
								<p>Produtos: </p>
								<div>{listProducts((order.products as Product[]))}</div>
							</div>}
						</li>
					)
				})}
			</ul>
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
