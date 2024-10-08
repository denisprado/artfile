import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import PageContainer from '@/components/PageContainer'

export const revalidate = 600

export default async function Page({ params }) {
	const pageNumber = params.pageNumber ? params.pageNumber : 2

	const payload = await getPayloadHMR({ config: configPromise })

	const posts = await payload.find({
		collection: 'posts',
		depth: 1,
		limit: 12,
		page: pageNumber,
	})

	return (
		<PageContainer>
			<div className="container mb-16">
				<div className="prose dark:prose-invert max-w-none">
					<h1>Posts</h1>
				</div>
			</div>

			<div className="container mb-8">
				<PageRange
					collection="posts"
					currentPage={posts.page}
					limit={12}
					totalDocs={posts.totalDocs}
				/>
			</div>

			<CollectionArchive relationTo={'posts'} items={posts.docs} />

			<div className="container">
				{posts.totalPages > 1 && posts.page && (
					<Pagination page={posts.page} totalPages={posts.totalPages} />
				)}
			</div>
		</PageContainer>
	)
}

export function generateMetadata({ params }): Metadata {
	const pageNumber = params.pageNumber ? params.pageNumber : 2

	return {
		title: `Payload Website Template Posts Page ${pageNumber}`,
	}
}

export async function generateStaticParams() {
	const payload = await getPayloadHMR({ config: configPromise })
	const posts = await payload.find({
		collection: 'posts',
		depth: 0,
		limit: 10,
	})

	const pages: number[] = []

	for (let i = 1; i <= posts.totalPages; i++) {
		pages.push(i)
	}

	return pages
}
