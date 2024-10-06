
import { Suspense } from 'react';
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import { Pagination } from '@/components/Pagination';
import SearchTable from '@/components/ui/search-table'

export default async function SearchPage({
	searchParams,
}: {
	searchParams?: {
		query?: string;
		page?: string;
	};
}) {
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;

	const payload = await getPayloadHMR({ config: configPromise })

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
		<div className="w-full container">
			<div className="flex w-full items-center justify-between">
				<h1 className={`text-2xl`}>Resultados da busca</h1>
			</div>

			{query !== '' && <SearchTable query={query} currentPage={currentPage} />}

			<div className="mt-5 flex w-full justify-center">

				{products.totalDocs + stores.totalDocs > 1 && query !== '' && (
					<Pagination page={currentPage} totalPages={products.totalDocs + stores.totalDocs} />
				)}
			</div>
		</div>
	);
}