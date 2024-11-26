import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import PageContainer from '@/components/PageContainer'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

export const revalidate = 600
export default async function Page() {
	const COLLECTION = 'stores'
	const payload = await getPayload({ config: configPromise })

	const stores = await payload.find({
		collection: COLLECTION,
		depth: 1,
		limit: 12,
	})

	return (
		<PageContainer>
			<div className="container mb-16">
				<div className="prose dark:prose-invert max-w-none">
					<h1>Lojas</h1>
				</div>
			</div>

			<div className="container mb-8">
				<PageRange
					collection={COLLECTION}
					currentPage={stores.page}
					limit={12}
					totalDocs={stores.totalDocs}
				/>
			</div>

			<CollectionArchive relationTo={COLLECTION} items={stores.docs} />

			<div className="container">
				{stores.totalPages > 1 && stores.page && (
					<Pagination page={stores.page} totalPages={stores.totalPages} slug='/stores' />
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
