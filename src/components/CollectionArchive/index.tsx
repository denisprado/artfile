import { cn } from '@/utilities/cn'
import React from 'react'

import { Card } from '@/components/Card'
import { Product, Store, Order } from '@/payload-types'

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
	items: Store[] | Product[] | Order[] | null
	relationTo: 'stores' | 'products' | 'orders'
	container?: boolean
}

export const CollectionArchive: React.FC<Props> = (props) => {
	const { items, relationTo, container = true } = props

	return (
		<div className={cn(container && 'container')}>
			<div>
				<div className="grid grid-cols-4 sm:grid-cols-8 lg:grid-cols-12 gap-y-4 gap-x-4 lg:gap-y-8 lg:gap-x-8 xl:gap-x-8 custom-grid">
					{items?.map((item: Store | Product | Order | null, index: React.Key | null | undefined) => {
						if (typeof item === 'object' && item !== null) {
							return (

								<Card
									doc={item as Product | Store}
									relationTo={relationTo}
									showCategories
									key={item.id}
								/>

							)
						}

						return null
					})}
				</div>
			</div>
		</div>
	)
}
