'use client';
import { stringToJson } from '@/utils/Parser';
import { getItem, saveItem } from '@/utils/StorageManagement';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const EmptyCart = {
	products: [],
	subTotal: 0,
	total: 0
};

const CartProvider = ({ children }) => {
	let cartState = EmptyCart;

	const addSneaker = (
		snakerId,
		sneakerColorId,
		amount,
		size,
		price,
		quantity
	) => {
		const snakerSubTotal = price * amount;
		saveItem(
			'cart',
			JSON.stringify({
				...cartState,
				products: [
					...cartState.products,
					{
						snakerId,
						sneakerColorId,
						size,
						amount,
						subTotal: snakerSubTotal,
						quantity
					}
				],
				subTotal: cartState.subTotal + snakerSubTotal
			})
		);
	};

	const removeProduct = (product) => {
		const initialSize = cartState.products.length;
		const products = cartState.products.filter((productCart) =>
			equalsProduct(productCart, product)
		);
		if (initialSize > products.length) {
			saveItem(
				'cart',
				JSON.stringify({
					...cartState,
					products,
					subTotal: cartState.subTotal - product.subTotal
				})
			);
		}
	};

	const equalsProduct = (product1, product2) => {
		return (
			product1.snakerId === product2.snakerId &&
			product1.sneakerColorId === product2.sneakerColorId &&
			product1.size === product2.size
		);
	};

	const findProduct = (product) => {
		cartState.products.map((productCart) => {
			if (equalsProduct(productCart, product)) {
				return productCart;
			}
		});
	};

	useEffect(() => {
		const cart = getItem('cart');
		if (cart) {
			cartState = stringToJson(cart);
		}
	}, []);

	return (
		<CartContext.Provider
			value={{
				cartState: cartState,
				addSneaker,
				removeProduct,
				findProduct,
				equalsProduct
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
