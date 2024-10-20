'use client'
import { cn } from '@/utilities/cn'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Order, Post, Product, Store } from '@/payload-types'

import AddToCartButton from '@/app/(frontend)/products/[slug]/AddCartButton'
import { Media } from '@/components/Media'
import Image from 'next/image'; // Import Image from Next.js


export type CardProps = {
	alignItems?: 'center'
	className?: string
	doc: Post | Store | Product | Order
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

	const { slug, categories, meta, title, name, description, price, thumbnail, logoStore, id } = doc as any

	const titleToUse = isOrder ? id : titleFromProps || title
	const imageUrlToUse = getImageUrl(isPost, thumbnail, logoStore, doc)
	const { width, height } = getImageDimensions(isProduct, thumbnail, logoStore)

	const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
	const href = `/${relationTo}/${slug || doc.id}`

	return (
		<article
			className={cn(
				'col-span-3 border border-border rounded-lg overflow-hidden bg-card hover:cursor-pointer grid grid-rows-subgrid row-span-6 gap-2',
				className,
			)}
			ref={card.ref}
		>
			<div className="relative w-full aspect-square">
				<Image
					src={imageUrlToUse || '/media/logo-artfile.svg'}
					alt={title || name}
					fill
					style={{ objectFit: 'cover' }}
				/>
				{meta?.image && typeof meta.image !== 'string' && <Media resource={meta.image} size="360px" />}
			</div>

			{showCategories && categories && Array.isArray(categories) && categories.length > 0 && (
				<div className="uppercase text-sm px-4">
					<div>
						{categories.map((category: any, index: number) => {
							if (typeof category === 'object') {
								const categoryTitle = category.title || 'Untitled category';
								const isLast = index === categories.length - 1;

								return (
									<Fragment key={index}>
										{categoryTitle}
										{!isLast && <Fragment>, &nbsp;</Fragment>}
									</Fragment>
								);
							}
							return null;
						})}
					</div>
				</div>
			)}

			{(titleToUse || name) && (
				<div className="prose px-4">
					<h3>
						<Link className="not-prose" href={href} ref={link.ref}>
							{titleToUse || name}
						</Link>
					</h3>
				</div>
			)}

			<div className="px-4">
				<p className='m-0'>{sanitizedDescription}</p>
			</div>

			{isProduct && price && (
				<div className="mt-2 text-xl font-bold px-4">R$ {price.toFixed(2)}</div>
			)}

			{isProduct && price && (
				<div className='p-4'>
					<AddToCartButton product={doc as Product} />
				</div>
			)}
		</article>
	)
}

// Função auxiliar para obter a URL da imagem
const getImageUrl = (isPost: boolean, thumbnail: any, logoStore: any, doc: any) => {
	const imgProduct = thumbnail?.sizes?.thumbnail?.filename;
	const imgStore = logoStore?.sizes?.thumbnail?.filename;

	if (isPost) return doc.imageUrl;
	if (imgProduct) return "/" + imgProduct;
	if (imgStore) return "/" + imgStore;
	return '/media/artfile-logo.svg';
};

// Função auxiliar para obter as dimensões da imagem
const getImageDimensions = (isProduct: boolean, thumbnail: any, logoStore: any) => {
	const width = isProduct && thumbnail?.sizes?.thumbnail?.width ? thumbnail.sizes.thumbnail.width : (logoStore?.sizes?.thumbnail?.width || 340);
	const height = isProduct && thumbnail?.sizes?.thumbnail?.height ? thumbnail.sizes.thumbnail.height : (logoStore?.sizes?.thumbnail?.height || 300);
	return { width, height };
};
