import type { Metadata } from 'next/types'
import PageContainer from '@/components/PageContainer';

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import { ProductsPageTitle } from '../../page';

export const dynamic = 'force-static'
export const revalidate = 600
const COLLECTION = 'products'
export default async function Page({ params }) {
	const payload = await getPayloadHMR({ config: configPromise })

	const posts = await payload.find({
		collection: COLLECTION,
		depth: 1,
		limit: 12,
		where: {
			'categories.slug': {
				equals: params.slug
			}
		}
	})

	return (
		<PageContainer>
			<ProductsPageTitle />

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
