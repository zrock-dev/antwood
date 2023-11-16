'use client';

import { CartContext } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState } from 'react';

const CartRenderer = () => {
	const router = useRouter();
	const { cartState, products } = useContext(CartContext);
	const [hasProducts, setHasProducts] = useState(false);

	useEffect(() => {
		if (cartState && products.length > 0) {
			setHasProducts(true);
		} else {
			router.push('/');
		}
	}, []);

	return cartState ? (
		<div>
			{hasProducts ? (
				<div>
					<h2>YOUR CART</h2>
					{products.map((product, index) => (
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
				</div>
			) : (
				<span>You don't have any sneakers in your cart.</span>
			)}

			<div>
				<b>Subtotal: {cartState.subTotal} $</b>
				<b>Shipping & Handling: {100} $</b>
				<b>TOTAL {cartState.total} $</b>

				<p className="description margin-top-15">
					You can choose from these payment options to purchase.
				</p>
				<img
					src="https://res.cloudinary.com/dex16gvvy/image/upload/v1700097392/solestyle/ggbomtfumdkoggc5gjqk.png"
					alt=""
				/>

				<button
					className={`general-button margin-top-15 ${
						!hasProducts && 'disabled'
					}`}
					disabled={!hasProducts}
					onClick={() => router.push('/cart')}
				>
					CHECKOUT CART
				</button>
			</div>
		</div>
	) : (
		<div className="loader-container">
			<span className="loader"></span>
		</div>
	);
};

export default CartRenderer;
