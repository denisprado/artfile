import imageLoader from '@/lib/imageLoader'
import Image from 'next/image'
import React from 'react'

export const Icon = () => {
	return (
		/* eslint-disable @next/next/no-img-element */
		<Image
			loader={imageLoader}
			alt="Artfile Logo"
			// className="max-w-[9.375rem] invert dark:invert-0"
			className="max-w-[9.375rem]"
			src="/media/favicon.svg"
			width={150}
			height={38}
		/>
	)
}

export default Icon