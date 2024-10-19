'use client'

import { Media, Product } from '@/payload-types'
import Image from 'next/image'
import { useState } from 'react'


type CarrouselProps = {
	product: Product;
}

const Carrousel: React.FC<CarrouselProps> = ({ product }) => {

	const imagesArray = product.images || []
	const hasMoreThanOneImage = imagesArray.length > 0
	const images = hasMoreThanOneImage ? imagesArray.map(image => image.images as Media) : []

	const initialImage = hasMoreThanOneImage
		? (images[0]?.sizes?.card?.filename || '')
		: ((product.thumbnail as Media)?.sizes?.card?.filename || '')

	const [activeImage, setActiveImage] = useState(initialImage)

	const getImageSize = (size: 'card' | 'thumbnail') => {
		return images[0]?.sizes?.[size] || { width: 100, height: 100 }
	}

	const { width, height } = getImageSize('card')
	const { width: widthThumb, height: heightThumb } = getImageSize('thumbnail')

	console.table(images)

	return (
		<div className='grid grid-cols-1 gap-4 sm:grid-cols-12'>
			{hasMoreThanOneImage && (
				<div className='col-span-2 flex flex-col gap-2'>
					{images.map(image => (
						<button
							onClick={() => setActiveImage(image.sizes?.thumbnail?.filename || '')}
							className='w-full aspect-square'
							key={image.id}
						>
							<Image
								src={"/" + (image.sizes?.thumbnail?.filename || '/media/artfile-logo.svg')}
								alt={product.name || 'Imagem do produto'}
								className="w-full rounded-lg shadow-lg"
								width={widthThumb!}
								height={heightThumb!}
								style={{ objectFit: 'cover' }}
								priority
							/>
						</button>
					))}
				</div>
			)}
			<div className={hasMoreThanOneImage ? 'col-span-10' : 'col-span-12'}>
				{activeImage && (
					<Image
						src={"/" + activeImage}
						alt={product.name || 'Imagem do produto'}
						className="w-full h-auto rounded-lg shadow-lg"
						width={width!}
						height={height!}
						style={{ objectFit: 'cover' }}
						priority
					/>
				)}
			</div>
		</div>
	)
}

export default Carrousel
