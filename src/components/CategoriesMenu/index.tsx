'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
export type Cat = {
	slug: string
	title: string
} | undefined

const CategoriesMenu = ({ uniqueCategoryNames }: { uniqueCategoryNames: Cat[] }) => {

	const pathname = usePathname()
	console.log(pathname)
	return (

		uniqueCategoryNames.map((category) => (
			<Link key={category && category!.slug} href={category?.slug!} className='py-1 hover:underline-offset-1'>{category?.title}</Link>
		))

	)
}

export default CategoriesMenu