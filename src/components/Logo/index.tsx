
import imageLoader from '@/lib/imageLoader'
import { cn } from '@/utilities/cn'
import Image from 'next/image'

export const Logo = ({ invert = false }: { invert?: boolean }) => {
	return (
		/* eslint-disable @next/next/no-img-element */
		<Image
			loader={imageLoader}
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