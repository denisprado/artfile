
import SearchTable from '@/components/ui/search-table';
import configPromise from '@payload-config';
import { getPayload } from 'payload';

export default async function SearchPage(
	props: {
		searchParams?: Promise<{
			query?: string;
			page?: string;
		}>;
	}
) {
	const searchParams = await props.searchParams;
	const query = searchParams?.query || '';
	const currentPage = Number(searchParams?.page) || 1;

	const payload = await getPayload({ config: configPromise })

	const products = await payload.find({
		collection: 'products',
		depth: 1,
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
		</div>
	);
}