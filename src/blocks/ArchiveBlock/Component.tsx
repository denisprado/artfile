import type { ArchiveBlock as ArchiveBlockProps, Order, Product, Store } from '@/payload-types'

import RichText from '@/components/RichText'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { CollectionArchive } from '@/components/CollectionArchive'

export const ArchiveBlock: React.FC<
	ArchiveBlockProps & {
		id?: string
		relationTo: 'stores' | 'products' | 'orders'
	}
> = async (props) => {
	const { id, relationTo, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

	const limit = limitFromProps || 3

	let posts: Store[] | Product[] | Order[] = []

	if (populateBy === 'collection') {
		const payload = await getPayload({ config: configPromise })

		const flattenedCategories = categories?.map((category) => {
			if (typeof category === 'object') return category.id
			else return category
		})

		const fetchedPosts = await payload.find({
			collection: relationTo ? relationTo : 'stores',
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

		posts = fetchedPosts.docs as Store[] | Product[] | Order[]
	} else {
		if (selectedDocs?.length) {
			const filteredSelectedPosts = selectedDocs.map((post) => {
				if (typeof post.value === 'object') return post.value as Store | Product | Order
			}) as Store[] | Product[] | Order[]

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
			<CollectionArchive items={posts.map(post => ({ ...post, slug: post.slug || '' }))} relationTo={relationTo} />
		</div>
	)
}
