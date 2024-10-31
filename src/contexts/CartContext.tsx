'use client'

import { Product } from '@/payload-types'
import React, { createContext, useContext, useEffect, useState } from 'react'

export type CartItem = {
	product: Product
	quantity: number
	userStripe: string
}

type CartContextType = {
	cart: CartItem[]
	addToCart: (product: Product, userStripe: string) => void
	removeFromCart: (productId: string) => void
	clearCart: () => void
	getCartTotal: () => number
	getCartCountItems: () => number
	updateCartQuantity: (productId: string, quantity: number) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [cart, setCart] = useState<CartItem[]>(() => {
		// Recupera o carrinho do localStorage apenas no cliente
		if (typeof window !== 'undefined') {
			const storedCart = localStorage.getItem('cart');
			return storedCart ? JSON.parse(storedCart) : [];
		}
		return []; // Retorna um array vazio se estiver no servidor
	});

	useEffect(() => {
		// Atualiza o localStorage sempre que o carrinho mudar
		if (typeof window !== 'undefined') {
			localStorage.setItem('cart', JSON.stringify(cart));
		}
	}, [cart]);

	useEffect(() => {
		const savedCart = localStorage.getItem('cart')
		if (savedCart) {
			const parsedCart = JSON.parse(savedCart)
			// Verifica se o carrinho salvo é diferente do estado atual
			if (JSON.stringify(parsedCart) !== JSON.stringify(cart)) {
				setCart(parsedCart as CartItem[])
			}
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('cart', JSON.stringify(cart))
	}, [cart])

	const addToCart = (product: Product, userStripe: string) => {
		setCart((currentCart: CartItem[]) => {
			// const existingStripeId = currentCart.length > 0 && currentCart[0].userStripe
			const existingItem = currentCart.find(item => item.product.id === product.id)


			if (existingItem) {
				return currentCart.map(item =>
					item.product.id === product.id
						? { ...item, quantity: item.quantity + 1 }
						: item
				)
			}
			// return isSameExistingStripeId ? [...currentCart, { product, quantity: 1, userStripe: userStripe }] : currentCart
			return [...currentCart, { product, quantity: 1, userStripe: userStripe }]
		})
	}

	const removeFromCart = (productId: string) => {
		setCart((currentCart: CartItem[]) => currentCart.filter(item => item.product.id !== productId))
	}

	const clearCart = () => {
		setCart([])
		localStorage.removeItem('cart')
	}

	const getCartTotal = () => {
		return cart.reduce((total: number, item: { product: { price: number }; quantity: number }) => total + item.product.price * item.quantity, 0)
	}

	const getCartCountItems = () => {
		return cart.reduce((total: number, item: { quantity: number }) => total + item.quantity, 0)
	}

	const updateCartQuantity = (productId: string, quantity: number) => {
		setCart((currentCart: CartItem[]) => {
			return currentCart.map((item) =>
				item.product.id === productId
					? { ...item, quantity } // Atualiza a quantidade do item
					: item
			);
		});
	}

	return (
		<CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getCartTotal, getCartCountItems, updateCartQuantity }}>
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
