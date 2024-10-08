import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import PageContainer from '@/components/PageContainer'

export const dynamic = 'force-static'
export const revalidate = 600
const COLLECTION = 'products'
export default async function Page() {
	const payload = await getPayloadHMR({ config: configPromise })

	const posts = await payload.find({
		collection: COLLECTION,
		depth: 1,
		limit: 12,
	})

	return (
		<PageContainer>
			<div className="container mb-16">
				<div className="prose dark:prose-invert max-w-none">
					<h1>Produtos</h1>
				</div>
			</div>

			<div className="container mb-8">
				<PageRange
					collection={COLLECTION}
					currentPage={posts.page}
					limit={12}
					totalDocs={posts.totalDocs}
				/>
			</div>

			<CollectionArchive relationTo={COLLECTION} items={posts.docs} />

			<div className="container">
				{posts.totalPages > 1 && posts.page && (
					<Pagination page={posts.page} totalPages={posts.totalPages} />
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
