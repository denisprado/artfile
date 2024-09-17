import { cn } from 'src/utilities/cn'
import React from 'react'

import { Card } from '@/components/Card'
import { Post, Product, Store } from '@/payload-types'

export type CollectionItem = {
	id: string
	name?: string
	title?: string
	description?: string
	excerpt?: string
	slug?: string
	price?: number
	imageUrl?: string
}

export type Props = {
	items: Post[] | Store[] | Product[] | null
	relationTo: 'posts' | 'stores' | 'products'
	container?: boolean
}

export const CollectionArchive: React.FC<Props> = (props) => {
	const { items, relationTo, container = true } = props

	return (
		<div className={cn(container && 'container')}>
			<div>
				<div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8">
					{items?.map((item: Post | Store | Product | null, index: React.Key | null | undefined) => {
						if (typeof item === 'object' && item !== null) {
							return (
								<div className="col-span-4" key={index}>
									<Card
										className="h-full"
										doc={item as Post | Product | Store}
										relationTo={relationTo}
										showCategories
									/>
								</div>
							)
						}

						return null
					})}
				</div>
			</div>
		</div>
	)
}
