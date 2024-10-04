'use client'

import { cn } from "@/utilities/cn"
import Link from "next/link"
import { usePathname } from "next/navigation"
export type Cat = {
	slug?: string | null
	title?: string | null
} | undefined

const CategoriesMenu = ({ uniqueCategoryNames }: { uniqueCategoryNames: Cat[] }) => {

	const pathname = usePathname()
	const pathArray = pathname.split('/')
	const catActive = pathArray[pathArray.length]
	return (

		uniqueCategoryNames.map((category) => {
			return (
				<Link key={category && category!.slug} href={category?.slug!} className={cn('py-1 hover:underline-offset-1 ', catActive === category!.slug && 'border-l font-bold')}>{category?.title}</Link>
			)
		})

	)
}

export default CategoriesMenu