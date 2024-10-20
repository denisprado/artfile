import type { Metadata } from 'next/types'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import { User, Order, Media, Product } from '@/payload-types'
import { getMeUserServer } from '@/utilities/getMeUserServer'
import { CollectionArchive } from '@/components/CollectionArchive'
import PageContainer from '@/components/PageContainer'
import { TabsField } from '@payloadcms/ui'
import { DownloadIcon, LockIcon } from 'lucide-react'
import CollectionProductFiles from '@/components/CollectionProductFiles'
import Carrousel from '@/components/Carrousel'
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

	const files = Array.from(new Set(orders.docs.flatMap(order =>
		(order.products as Product[])
	)));
	console.table(files)

	return (
		<PageContainer>
			<div className="container mb-16">
				<div className="prose dark:prose-invert max-w-none">
					<h1>Minhas compras</h1>
				</div>
			</div>


			<div className='container'>

				<div className='grid-cols-1 sm:grid-cols-12 gap-8'>
					{(files)?.map((file) => {
						return (
							// <li key={file!.id} className='py-4'>
							// 	<a target='_blank' key={file!.id} href={'https://plato-artfile.s3.us-east-2.amazonaws.com/' + (file?.file as Media).filename}>
							// 		<div className='flex gap-2'>{<DownloadIcon color='green' />} {file?.title} | {(file?.file as Media).filename}
							// 		</div>
							// 	</a>
							// </li>
							<div className='grid grid-cols-1 sm:grid-cols-12 gap-16 border-b-2 p-8' key={file.id} >
								<div className='col-span-4'>
									<div className='w-full'>
										<Carrousel product={file} position='bottom' />
									</div>
								</div>
								<div className='col-span-8'>
									<div className='w-full'>
										<h3>{file.name}</h3>
										<h3>{file.description}</h3>
										<h3>{file.price}</h3>
									</div>
									<CollectionProductFiles isPurchased={true} product={file} />
								</div>
							</div>
						)
					})}
				</div>
			</div>

			{/* <CollectionArchive relationTo={COLLECTION} items={orders.docs} /> */}
			{/* {<p>USer: {user?.id}</p>}
			{orders.docs.map(order => {
				return <p key={order.id}>{order.id} - {myOrders.map(order => <span key={order.id}>{(order.createdBy as User)?.id}</span>)}</p>
			})} */}

			<div className="container">
				{orders.totalPages > 1 && orders.page && (
					<Pagination page={orders.page} totalPages={orders.totalPages} />
				)}
			</div>
		</PageContainer>
	)
}

export function generateMetadata(): Metadata {
	return {
		title: `ArtFile - compra e venda de arquivos`,
	}
}
