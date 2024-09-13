'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { Product } from '@/payload-types'

type CartItem = {
	product: Product
	quantity: number
}

type CartContextType = {
	cart: CartItem[]
	addToCart: (product: Product) => void
	removeFromCart: (productId: string) => void
	clearCart: () => void
	getCartTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [cart, setCart] = useState<CartItem[]>([])

	useEffect(() => {
		const savedCart = localStorage.getItem('cart')
		if (savedCart) {
			setCart(JSON.parse(savedCart))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	const addToCart = (product: Product) => {
		setCart(currentCart => {
			const existingItem = currentCart.find(item => item.product.id === product.id)
			if (existingItem) {
				return currentCart.map(item =>
					item.product.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			}
			return [...currentCart, { product, quantity: 1 }]
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

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal }}>
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
