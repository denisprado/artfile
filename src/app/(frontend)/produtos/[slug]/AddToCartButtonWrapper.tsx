import React from 'react'
import { getMeUserServer } from '@/utilities/getMeUserServer'
import AddToCartButton from './AddCartButton'
import type { Product } from '@/payload-types'

type Props = {
	product: Product
}

const AddToCartButtonWrapper: React.FC<Props> = async ({ product }) => {
	const { user } = await getMeUserServer()

	return <AddToCartButton product={product} user={user!} />
}

export default AddToCartButtonWrapper
