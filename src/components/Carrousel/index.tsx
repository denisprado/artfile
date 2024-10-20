'use client'

import { Media, Product } from '@/payload-types'
import Image from 'next/image'
import { useState } from 'react'


type CarrouselProps = {
	product: Product
	position?: 'left' | 'bottom'
}

const Carrousel: React.FC<CarrouselProps> = ({ product, position = 'left' }) => {

	const imagesArray = product.images || []
	const hasMoreThanOneImage = imagesArray.length > 0
	const images = hasMoreThanOneImage ? imagesArray.map(image => image.images as Media) : []

	const initialImage = hasMoreThanOneImage
		? (images[0]?.sizes?.card?.filename || '')
		: ((product.thumbnail as Media)?.sizes?.card?.filename || '')

	const [activeImage, setActiveImage] = useState(initialImage)

	const getImageSize = (size: 'card' | 'thumbnail' | 'carrouselThumb') => {
		return images[0]?.sizes?.[size] || { width: 100, height: 100 }
	}

	const { width, height } = getImageSize('card')
	const { width: widthThumb, height: heightThumb } = getImageSize('carrouselThumb')

	const renderThumbnailButton = (image: Media) => (
		<button
			onClick={() => setActiveImage(image.sizes?.card?.filename || '')}
			className={`w-full aspect-square rounded-lg transition duration-200 ease-in-out col-span-3 ${activeImage === image.sizes?.card?.filename ? 'outline outline-2 outline-black-500' : ''}`}
			key={image.id}
		>
			<Image
				src={"/" + (image.sizes?.carrouselThumb?.filename || 'media/artfile-logo.svg')}
				alt={product.name || 'Imagem do produto'}
				className="w-full rounded-lg shadow-lg"
				width={widthThumb ? widthThumb : 100}
				height={heightThumb ? heightThumb : 100}
				style={{ objectFit: 'contain' }}
				priority
			/>
		</button>
	);

	return (
		<div className={`grid grid-cols-1 gap-4 ${position === 'left' ? 'sm:grid-cols-12' : ''}`}>
			{hasMoreThanOneImage && position === 'left' && (
				<div className='col-span-2 flex flex-col gap-2'>
					{images.map(renderThumbnailButton)}
				</div>
			)}
			<div className={hasMoreThanOneImage ? (position === 'left' ? 'col-span-10' : 'col-span-12') : 'col-span-12'}>
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
			{hasMoreThanOneImage && position === 'bottom' && (
				<div className='grid grid-cols-12 gap-2 mt-4'>
					{images.map(renderThumbnailButton)}
				</div>
			)}
		</div>
	)
}

export default Carrousel
