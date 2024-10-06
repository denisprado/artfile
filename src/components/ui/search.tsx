'use client';

import { useDebouncedCallback } from "use-debounce";
import { SearchIcon } from "lucide-react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import SearchTable from "./search-table";
import { Suspense } from "react";

export default function Search({ placeholder }: { placeholder: string }) {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const { replace } = useRouter();

	const handleSearch = useDebouncedCallback((term) => {
		console.log(`Searching... ${term}`);

		const params = new URLSearchParams(searchParams);
		if (term) {
			params.set('query', term);
		} else {
			params.delete('query');
		}
		replace(`${pathname}?${params.toString()}`);
	}, 300);

	return (
		<div className="relative flex flex-1 flex-shrink-0">
			<label htmlFor="search" className="sr-only">
				Busca
			</label>
			<input
				className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
				placeholder={placeholder}
				onChange={(e) => {
					handleSearch(e.target.value);
				}}
				onKeyDown={(e) => {
					if (e.key === 'Enter') {
						const term = e.currentTarget.value;
						if (term) {
							// Navegar para a página search-result com o termo de busca
							replace(`/search-result?query=${term}`);
						}
					}
				}}
				defaultValue={searchParams.get('query')?.toString()}
			/>
			<SearchIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
			{/* <SearchTable query={searchParams.get('query')?.toString()} currentPage={1} /> */}
		</div>
	);
}