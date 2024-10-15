
import { cn } from '@/utilities/cn'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const Logo = ({ invert = false }: { invert?: boolean }) => {
	return (
		/* eslint-disable @next/next/no-img-element */
		<Image
			alt="Artfile Logo"
			className={cn("max-w-[9.375rem] dark:invert", invert && 'invert')}
			// className="max-w-[9.375rem]"
			src="/media/artfile-logo.svg"
			width={150}
			height={38}
		/>
	)
}

export default Logo