'use client';
import { createContext, useState } from 'react';

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
		setCartState({
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
		});
	};

	return (
		<CartContext.Provider
			value={{
				cartState: cartState,
				addSneaker
			}}
		>
			{children}
		</CartContext.Provider>
	);
};

export default CartProvider;
