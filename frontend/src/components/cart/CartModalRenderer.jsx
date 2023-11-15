'use client';

import { CartContext } from '@/context/CartContext';
import { getCartProductsInformation } from '@/requests/CartRequest';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const CartModalRenderer = () => {
	const router = useRouter();
	const { cartState } = useContext(CartContext);
	const [productData, setProductData] = useState(null);
	const hasProducts = cartState.products.lenght > 1;

	useEffect(() => {
		getCartProductsInformation(cartState.products)
			.then(setProductData)
			.catch((e) => {
				console.log(e);
			});
	}, []);

	return productData ? (
		<div>
			{hasProducts ? (
				<>
					<div>
						<h2>YOUR CART</h2>
					</div>
					{productData.map((product, index) => (
						<div key={index}>
							<img src="" alt="" />
							<div></div>
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
