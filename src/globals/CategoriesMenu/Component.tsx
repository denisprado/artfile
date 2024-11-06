import { getCachedGlobal } from '@/utilities/getGlobals'
import { CategoriesClient } from './Component.client'

import { checkRole } from '@/collections/Users/checkRole'
import type { CategoriesMenu } from '@/payload-types'
import { getMeUserServer } from '@/utilities/getMeUserServer'
import configPromise from '@payload-config'
import { getPayloadHMR } from '@payloadcms/next/utilities'

export async function CategoriesMenu() {
	const categories: CategoriesMenu = await getCachedGlobal('categoriesMenu', 1)()
	const user = await getMeUserServer()
	const isVendor = checkRole(["admin", "vendor"], user.user)

	const payload = getPayloadHMR({ config: configPromise })
	const allCategories = (await payload).find({
		collection: 'categories', where: {
			stick: {
				equals: true
			}
		}
	})

	return <>
		<CategoriesClient categories={categories} isVendor={isVendor} megaMenuCategories={(await allCategories).docs!} />
	</>
}
