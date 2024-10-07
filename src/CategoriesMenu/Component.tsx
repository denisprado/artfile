import { getCachedGlobal } from '@/utilities/getGlobals'
import { CategoriesClient } from './Component.client'

import type { CategoriesMenu } from '@/payload-types'

export async function CategoriesMenu() {
	const categories: CategoriesMenu = await getCachedGlobal('categoriesMenu', 1)()

	return <>
		<CategoriesClient categories={categories} />
	</>
}
