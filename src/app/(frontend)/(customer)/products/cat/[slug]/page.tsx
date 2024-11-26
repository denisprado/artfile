import type { Metadata } from 'next/types'
import PageContainer from '@/components/PageContainer';

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

export const revalidate = 600
const COLLECTION = 'products'
export default async function Page(props) {
	const params = await props.params;
	const payload = await getPayload({ config: configPromise })

	const products = await payload.find({
		collection: COLLECTION,
		depth: 1,
		limit: 12,
		where: {
			'categories.slug': {
				equals: params.slug
			}
		}
	})

	const ProductsPageTitle = () => {
		return <div className="container mb-16">
			<div className="prose dark:prose-invert max-w-none">
				<h1>Produtos</h1>
			</div>
		</div>
	}

	return (
		<PageContainer>
			<ProductsPageTitle />

			<div className="container mb-8">
				<PageRange
					collection={COLLECTION}
					currentPage={products.page}
					limit={12}
					totalDocs={products.totalDocs}
				/>
			</div>

			<CollectionArchive relationTo={COLLECTION} items={products.docs} />

			<div className="container">
				{products.totalPages > 1 && products.page && (
					<Pagination page={products.page} totalPages={products.totalPages} slug={'cat/' + params.slug} />
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
