import Carrousel from '@/components/Carrousel'
import CollectionProductFiles from '@/components/CollectionProductFiles'
import PageContainer from '@/components/PageContainer'
import { Category, Product } from '@/payload-types'
import { getMeUserServer } from '@/utilities/getMeUserServer'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import type { Metadata } from 'next/types'
// export const dynamic = 'force-static'
export const revalidate = 600
const COLLECTION = 'orders'
export default async function Page() {
	const payload = await getPayload({ config: configPromise })

	const { user } = await getMeUserServer()
	const orders = await payload.find({
		collection: COLLECTION,
		depth: 2,
		// limit: 12,
		where: {
			'createdBy.id': {
				equals: user?.id
			}
		}
	})

	const products = Array.from(new Set(orders.docs.flatMap(order =>
		(order.products as Product[])
	)));

	return (
		<PageContainer>
			<div className="container mb-16">
				<div className="prose dark:prose-invert max-w-none">
					<h1>Minhas compras</h1>
				</div>
			</div>
			<div className='container'>
				<div className='grid-cols-1 sm:grid-cols-12 gap-8'>
					{(products)?.map((product) => {
						const categories = (product.categories as Product['categories'])?.map(cat => { return (cat as Category).title })
						return (
							// <li key={file!.id} className='py-4'>
							// 	<a target='_blank' key={file!.id} href={'https://plato-artfile.s3.us-east-2.amazonaws.com/' + (file?.file as Media).filename}>
							// 		<div className='flex gap-2'>{<DownloadIcon color='green' />} {file?.title} | {(file?.file as Media).filename}
							// 		</div>
							// 	</a>
							// </li>
							<div key={product.id} className="grid grid-cols-1 sm:grid-cols-12 gap-20">
								<div className='col-span-7'>
									<Carrousel product={product} />
								</div>
								<div className='col-span-5'>
									<span className="text-3xl font-bold mb-4">{product?.name}</span>
									<p className="text-gray-600 mb-4">{product?.description}</p>
									<p className="text-2xl font-bold mb-4">R$ {product?.price?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
									{product?.categories && (
										<div className="mb-4">
											<span className="font-semibold">{categories?.length! > 1 ? "Categorias:" : "Categoria:"}</span> {categories?.join(', ')}
										</div>
									)}

									<CollectionProductFiles product={product} isPurchased={true} />

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

			{/* <div className="container">
				{orders.totalPages > 1 && orders.page && (
					<Pagination page={orders.page} totalPages={orders.totalPages} />
				)}
			</div> */}
		</PageContainer>
	)
}

export function generateMetadata(): Metadata {
	return {
		title: `ArtFile - compra e venda de arquivos`,
	}
}
