import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { Suspense } from 'react'
import { CollectionArchive } from '../CollectionArchive'


export default async function SearchTable({ query, currentPage }) {

	const payload = await getPayload({ config: configPromise })

	const products = await payload.find({
		collection: 'products',
		depth: 1,
		limit: 12,
		where: {
			or: [
				{
					name: {
						contains: query
					}
				},
				{
					slug: {
						contains: query
					}
				},
			]
		}
	})

	const stores = await payload.find({
		collection: 'stores',
		depth: 1,
		limit: 12,
		where: {
			or: [
				{
					name: {
						contains: query
					}
				},
				{
					slug: {
						contains: query
					}
				},
			]
		}
	})

	return (
		<div className="w-full">

			{query !== '' && <Suspense key={query + currentPage} fallback={<p>Buscando...</p>}>
				{/* <Table query={query} currentPage={currentPage} /> */}
				<h5>Produtos</h5>

				{products.docs.length > 0 ? <CollectionArchive items={products.docs} relationTo='products'></CollectionArchive> : 'Nenhum produto encontrado...'}

				<h5>Lojas</h5>
				{stores.docs.length > 0 ? <CollectionArchive items={stores.docs} relationTo='stores'></CollectionArchive> : 'Nenhuma loja encontrada...'}
			</Suspense>}


			<div className="mt-5 flex w-full justify-center">
				{/* <Pagination totalPages={totalPages} /> */}
			</div>
		</div>
	);
}