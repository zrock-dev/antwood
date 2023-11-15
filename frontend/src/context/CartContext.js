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
	const [cartState, setCartState] = useState(EmptyCart);

	const addSneaker = (
		snakerId,
		sneakerColorId,
		amount,
		size,
		price,
		quantity
	) => {
		const snakerSubTotal = price * amount;
		cartState.products.push({
			snakerId,
			sneakerColorId,
			size,
			amount,
			subTotal: snakerSubTotal,
			quantity
		});
		saveItem(
			'cart',
			JSON.stringify({
				...cartState,
				products: cartState.products,
				subTotal: calculateSubTotal(cartState.products)
			})
		);
	};

	const removeProduct = (product) => {
		const initialSize = cartState.products.length;
		const products = cartState.products.filter(
			(productCart) => !equalsProduct(productCart, product)
		);

		if (products.length < initialSize) {
			saveItem(
				'cart',
				JSON.stringify({
					...cartState,
					products,
					subTotal: calculateSubTotal(products)
				})
			);
		}
	};

	const updateProduct = (product) => {
		const products = cartState.products;
		for (let index = 0; index < products.length; index++) {
			if (equalsProduct(cartState.products[index], product)) {
				products[index].amount = product.amount;
				products[index].subTotal = product.amount * product.price;
				products[index].quantity = product.quantity;
			}
		}

		saveItem(
			'cart',
			JSON.stringify({
				...cartState,
				products,
				subTotal: calculateSubTotal(products)
			})
		);
	};

	const calculateSubTotal = (products) => {
		let subTotal = 0;
		products.map((product) => {
			subTotal += product.subTotal;
		});
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
			setCartState(stringToJson(cart));
			console.log(stringToJson(cart));
			// const cartNose = {
				// products: [
				// 	{
				// 		snakerId: '6543c443d88b1c5386061b89',
				// 		sneakerColorId: '6543c46cd88b1c5386061b8b',
				// 		size: 3,
				// 		amount: 4,
				// 		subTotal: 340,
				// 		quantity: 11
				// 	},
				// 	{
				// 		snakerId: '6543c443d88b1c5386061b89',
				// 		sneakerColorId: '6543c46cd88b1c5386061b8b',
				// 		size: 4,
				// 		amount: 17,
				// 		subTotal: 1445,
				// 		quantity: 17
				// 	}
				// ],
			// 	total: 0
			// };
		}
	}, []);

	return (
		<CartContext.Provider
			value={{
				cartState: cartState,
				addSneaker,
				removeProduct,
				updateProduct,
				findProduct,
				equalsProduct
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
