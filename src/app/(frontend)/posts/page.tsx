import type { Metadata } from 'next/types'
import PageContainer from '@/components/PageContainer';

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'

export const revalidate = 600

export default async function Page() {
	const payload = await getPayloadHMR({ config: configPromise })

	const posts = await payload.find({
		collection: 'posts',
		depth: 1,
		limit: 12,
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

export function generateMetadata(): Metadata {
	return {
		title: `Payload Website Template Posts`,
	}
}
