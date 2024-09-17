import type { Post, ArchiveBlock as ArchiveBlockProps, Store, Product } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
	ArchiveBlockProps & {
		id?: string
		collection: 'posts' | 'stores' | 'products'
	}
> = async (props) => {
	const { id, collection, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

	const limit = limitFromProps || 3

	let posts: Post[] | Store[] | Product[] = []

	if (populateBy === 'collection') {
		const payload = await getPayloadHMR({ config: configPromise })

		const flattenedCategories = categories?.map((category) => {
			if (typeof category === 'object') return category.id
			else return category
		})

		const fetchedPosts = await payload.find({
			collection: collection ? collection : 'stores',
			depth: 1,
			limit,
			...(flattenedCategories && flattenedCategories.length > 0
				? {
					where: {
						categories: {
							in: flattenedCategories,
						},
					},
				}
				: {}),
		})

		posts = fetchedPosts.docs as Post[] | Store[] | Product[]
	} else {
		if (selectedDocs?.length) {
			const filteredSelectedPosts = selectedDocs.map((post) => {
				if (typeof post.value === 'object') return post.value as Post | Store | Product
			}) as Post[]

			posts = filteredSelectedPosts
		}
	}

	return (
		<div className="my-16" id={`block-${id}`}>
			{introContent && (
				<div className="container mb-16">
					<RichText className="ml-0 max-w-[48rem]" content={introContent} enableGutter={false} />
				</div>
			)}
			<CollectionArchive items={posts.map(post => ({ ...post, slug: post.slug || '' }))} relationTo={collection} />
		</div>
	)
}
