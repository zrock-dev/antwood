'use client';
import { stringToJson } from '@/utils/Parser';
import { getItem, saveItem } from '@/utils/StorageManagement';
import { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const EmptyCart = {
	products: [],
	subTotal: 0,
	extra: 100,
	total: 0
};

const CartProvider = ({ children }) => {
	const [cartState, setCartState] = useState(null);

	const addSneaker = (
		sneakerId,
		sneakerColorId,
		amount,
		size,
		price,
		quantity,
		image,
		name
	) => {
		const snakerSubTotal = price * amount;
		cartState.products.push({
			sneakerId,
			sneakerColorId,
			size,
			amount,
			subTotal: snakerSubTotal,
			quantity,
			price,
			image,
			name
		});

		setCartState({
			...cartState,
			products: cartState.products
		});
	};

	const removeProduct = (product) => {
		const initialSize = cartState.products.length;
		const products = cartState.products.filter(
			(productCart) => !equalsProduct(productCart, product)
		);

		if (products.length < initialSize) {
			setCartState({
				...cartState,
				products
			});
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

		setCartState({
			...cartState,
			products
		});
	};

	const calculateSubTotal = () => {
		let subTotal = 0;
		if (cartState) {
			cartState.products.map((product) => {
				subTotal += product.subTotal;
			});
		}
		return subTotal;
	};

	const equalsProduct = (product1, product2) => {
		return (
			product1.sneakerId === product2.sneakerId &&
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
		if (cartState) {
			const subTotal = calculateSubTotal();
			saveItem(
				'cart',
				JSON.stringify({
					...cartState,
					subTotal,
					total: subTotal + cartState.extra
				})
			);
		}
		console.log(cartState);
	}, [cartState]);

	useEffect(() => {
		const cart = getItem('cart');
		if (cart) {
			setCartState(stringToJson(cart));
		} else {
			setCartState(EmptyCart);
		}
	}, []);

	return (
		<CartContext.Provider
			value={{
				cartState: cartState,
				products: cartState?.products,
				subTotal: cartState?.subTotal,
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
