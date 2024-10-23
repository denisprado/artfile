import { getCachedGlobal } from '@/utilities/getGlobals'
import { CategoriesClient } from './Component.client'

import type { CategoriesMenu } from '@/payload-types'
import { getMeUserServer } from '@/utilities/getMeUserServer'
import UserMenu from '@/components/UserMenu'
import MegaMenu from '@/components/MegaMenu'
import { checkRole } from '@/collections/Users/checkRole'

export async function CategoriesMenu() {
	const categories: CategoriesMenu = await getCachedGlobal('categoriesMenu', 1)()
	const user = await getMeUserServer()
	const isVendor = checkRole(["admin", "vendor"], user.user)
	return <>
		<CategoriesClient categories={categories} isVendor={isVendor} />
	</>
}
