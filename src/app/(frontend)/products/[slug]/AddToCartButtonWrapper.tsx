import React from 'react'
import AddToCartButton, { Props } from './AddCartButton'



const AddToCartButtonWrapper: React.FC<Props> = async ({ product, appearence, label }) => {
	return <AddToCartButton product={product} label={label} appearence={appearence} />
}

export default AddToCartButtonWrapper
