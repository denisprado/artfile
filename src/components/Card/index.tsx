'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post, Store, Product, User } from '@/payload-types'

import { Media } from '@/components/Media'
import Image from 'next/image' // Import Image from Next.js
import AddToCartButtonWrapper from '@/app/(frontend)/products/[slug]/AddToCartButtonWrapper'
import AddToCartButton from '@/app/(frontend)/products/[slug]/AddCartButton'
import { getMeUserClient } from '@/utilities/getMeUserClient'

export type CardProps = {
	alignItems?: 'center'
	className?: string
	doc: Post | Store | Product
	relationTo: 'posts' | 'stores' | 'products' | 'orders'
	showCategories?: boolean
	title?: string
}

export const Card: React.FC<CardProps> = (props) => {
	const { card, link } = useClickableCard({})
	const { className, doc, relationTo, showCategories, title: titleFromProps } = props

	const isProduct = relationTo === 'products'
	const isStore = relationTo === 'stores'
	const isOrder = relationTo === 'orders'
	const isPost = relationTo === 'posts'

	const user = getMeUserClient()

	const { slug, categories, meta, title, name, description, price, imageUrl, thumbnail, logoStore, id } = doc as any

	const titleToUse = isOrder ? id : titleFromProps || title

	const imgProduct = thumbnail?.sizes?.thumbnail?.filename
	const imgStore = logoStore?.sizes?.thumbnail?.filename

	const imageUrlToUse = isPost ? imageUrl :
		isProduct ? "/" + imgProduct : isStore ?
			"/" + imgStore : '/media/artfile-logo.svg'


	const widthToUSe = isProduct && imgProduct ? thumbnail?.sizes?.thumbnail?.width : isStore && imgStore ? logoStore?.sizes?.thumbnail?.width : 500

	const heightToUse = (isProduct && imgProduct) ? thumbnail?.sizes?.thumbnail?.height : (isStore && imgStore) ? logoStore?.sizes?.thumbnail?.height : 300

	const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
	const href = `/${relationTo}/${slug || doc.id}`

	return (
		<article
			className={cn(
				'border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer',
				className,
			)}
			ref={card.ref}
		>
			<div className="relative w-full">
				{!imageUrlToUse && !meta?.image && <div className="">No image</div>}
				{imageUrlToUse && <Image src={imageUrlToUse} alt={title || name} layout="responsive" width={widthToUSe} height={heightToUse} />}
				{meta?.image && typeof meta.image !== 'string' && <Media resource={meta.image} size="360px" />}
			</div>
			<div className="p-4">
				{showCategories && categories && Array.isArray(categories) && categories.length > 0 && (
					<div className="uppercase text-sm mb-4">
						<div>
							{categories.map((category: any, index: number) => {
								if (typeof category === 'object') {
									const { title: titleFromCategory } = category
									const categoryTitle = titleFromCategory || 'Untitled category'
									const isLast = index === categories.length - 1

									return (
										<Fragment key={index}>
											{categoryTitle}
											{!isLast && <Fragment>, &nbsp;</Fragment>}
										</Fragment>
									)
								}

								return null
							})}
						</div>
					</div>
				)}
				{(titleToUse || name) && (
					<div className="prose">
						<h3>
							<Link className="not-prose" href={href} ref={link.ref}>
								{titleToUse || name}
							</Link>
						</h3>
					</div>
				)}
				{description && <div className="mt-2">
					<p>{sanitizedDescription}</p>
				</div>}
				{isProduct && price &&
					<div className='flex flex-col gap-4 w-full'>
						<div className="mt-2 text-xl font-bold">R$ {price.toFixed(2)}</div>

						<AddToCartButton product={doc as Product} user={user as unknown as User} />
					</div>

				}

			</div>
		</article>
	)
}
