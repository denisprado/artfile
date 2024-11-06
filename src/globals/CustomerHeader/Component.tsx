import '../../app/(frontend)/custom.css'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { HeaderClient } from './Component.client'

import type { Header } from '@/payload-types'
import { getMeUserServer } from '@/utilities/getMeUserServer'

export async function CustomerHeader() {
	const header: Header = await getCachedGlobal('header', 1)()
	const user = await getMeUserServer()
	return <>
		<HeaderClient header={header} user={user} />
	</>
}
