
import Search from '@/components/ui/search';

import { Suspense } from 'react';

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

	return (
		<div className="w-full">
			<div className="flex w-full items-center justify-between">
				<h1 className={`text-2xl`}>Busca</h1>
			</div>
			<div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
				<Search placeholder="Busca..." />

			</div>
			<Suspense key={query + currentPage} fallback={<p>Buscando...</p>}>
				{/* <Table query={query} currentPage={currentPage} /> */}
				<p>{query},{currentPage}</p>
			</Suspense>
			<div className="mt-5 flex w-full justify-center">
				{/* <Pagination totalPages={totalPages} /> */}
			</div>
		</div>
	);
}