'use client';

import { CartContext } from '@/context/CartContext';
import CartShopping from '@/icons/CartShopping';
import { stringToJson } from '@/utils/Parser';
import { getItem } from '@/utils/StorageManagement';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const CartModalRenderer = () => {
	const [cartState, setCartState] = useState(null);
	const [hasProducts, setHasProducts] = useState(false);

	useEffect(() => {
		let cart = getItem('cart');
		if (cart) {
			cart = stringToJson(cart);
			setCartState(cart);
			setHasProducts(cart.products.length > 1);
		}
	}, []);

	return cartState ? (
		<div>
			{hasProducts ? (
				<>
					<div>
						<h2>YOUR CART</h2>
					</div>
					{cartState.products.map((product, index) => (
						<div key={index}>
							<img src={product.image} alt="" />
							<div>
								<h4>{product.name}</h4>
								<span>Size: {product.size}</span>
								<button>{product.amount}</button>
								<b>Subtotal: {product.subTotal}</b>
							</div>
						</div>
					))}
				</>
			) : (
				<span>You don't have any sneakers in your cart.</span>
			)}

			<>
				{hasProducts && (
					<span>Total products in cart: {cartState.subTotal}</span>
				)}
				<button
					className={`general-button white ${!hasProducts && 'disabled'}`}
					disabled={!hasProducts}
					onClick={() => router.push('/cart')}
				>
					CHECKOUT CART
				</button>
				<p>You can choose from these payment options to purchase.</p>
			</>
		</div>
	) : (
		<div className="loader-container">
			<span className="loader"></span>
		</div>
	);
};

export default CartModalRenderer;
