'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product, User } from '@/payload-types'

type CartItem = {
	product: Product
	quantity: number
	userStripe: string
}

type CartContextType = {
	cart: CartItem[]
	addToCart: (product: Product) => void
	removeFromCart: (productId: string) => void
	clearCart: () => void
	getCartTotal: () => number
	getCartCountItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [cart, setCart] = useState<CartItem[]>([])

	useEffect(() => {
		const savedCart = localStorage.getItem('cart')
		if (savedCart) {
			const parsedCart = JSON.parse(savedCart)
			// Verifica se o carrinho salvo é diferente do estado atual
			if (JSON.stringify(parsedCart) !== JSON.stringify(cart)) {
				setCart(parsedCart)
			}
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	const addToCart = (product: Product) => {
		setCart(currentCart => {
			// const existingStripeId = currentCart.length > 0 && currentCart[0].userStripe
			// const isSameExistingStripeId = existingStripeId === userStripe
			const existingItem = currentCart.find(item => item.product.id === product.id)
			const accountConnectedStripe = currentCart.find(item => item.product.createdBy)?.userStripe || ''

			if (existingItem) {

				return currentCart.map(item =>
					item.product.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			}
			// return isSameExistingStripeId ? [...currentCart, { product, quantity: 1, userStripe: userStripe }] : currentCart
			return [...currentCart, { product, quantity: 1, userStripe: accountConnectedStripe }]
		})
	}

	const removeFromCart = (productId: string) => {
		setCart(currentCart => currentCart.filter(item => item.product.id !== productId))
	}

	const clearCart = () => {
		setCart([])
		localStorage.removeItem('cart')
	}

	const getCartTotal = () => {
		return cart.reduce((total, item) => total + item.product.price * item.quantity, 0)
	}

	const getCartCountItems = () => {
		return cart.reduce((total, item) => total + item.quantity, 0)
	}

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartCountItems }}>
			{children}
		</CartContext.Provider>
	)
}

export const useCart = () => {
	const context = useContext(CartContext)
	if (context === undefined) {
		throw new Error('useCart must be used within a CartProvider')
	}
	return context
}
