import type { Product } from '@/payload-types'
import React from 'react'
import AddToCartButton from './AddCartButton'

type Props = {
	product: Product
}

const AddToCartButtonWrapper: React.FC<Props> = async ({ product }) => {
	return <AddToCartButton product={product} />
}

export default AddToCartButtonWrapper
