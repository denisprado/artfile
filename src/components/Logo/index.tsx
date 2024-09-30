import Image from 'next/image'
import React from 'react'

export const Logo = () => {
	return (
		/* eslint-disable @next/next/no-img-element */
		<Image
			alt="Artfile Logo"
			// className="max-w-[9.375rem] invert dark:invert-0"
			className="max-w-[9.375rem]"
			src="/media/artfile-logo.svg"
			width={150}
			height={38}
		/>
	)
}

export default Logo