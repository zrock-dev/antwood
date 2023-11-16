'use client';

import { CartContext } from '@/context/CartContext';
import CartShopping from '@/icons/CartShopping';
import { stringToJson } from '@/utils/Parser';
import { getItem } from '@/utils/StorageManagement';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState, useRef } from 'react';

import '../../styles/cart/cartModal.css';
import '../../styles/cart/cart.css';
import ProductCartModal from './ProductCartModal';

const CartModalRenderer = () => {
	const router = useRouter();
	const { cartState, products, updateProduct } = useContext(CartContext);
	const [hasProducts, setHasProducts] = useState(false);
	const [isOpen, setOpen] = useState(false);
	const quantityButton = useRef();

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			document.getElementById('overlay').style.display = 'flex';
		} else {
			document.body.style.overflow = 'auto';
			document.getElementById('overlay').style.display = 'none';
		}
	}, [isOpen]);

	useEffect(() => {
		let onClickHandler = (e) => {
			if (
				quantityButton.current &&
				!quantityButton.current.contains(e.target)
			) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', onClickHandler);
		return () => {
			document.removeEventListener('mousedown', onClickHandler);
		};
	}, []);

	useEffect(() => {
		if (cartState) {
			setHasProducts(products.length > 0);
		}
	}, [cartState]);

	return (
		<div ref={quantityButton}>
			{isOpen && (
				<div className="cart-modal-main-container">
					{cartState ? (
						<div>
							{hasProducts ? (
								<>
									<div>
										<h2>YOUR CART</h2>
									</div>
									<div className="cart-modal-products-container">
										{products.map((product, index) => (
											<ProductCartModal
												product={product}
												key={index}
												updateProduct={updateProduct}
											/>
										))}
									</div>
								</>
							) : (
								<span>You don't have any sneakers in your cart.</span>
							)}

							<div className="cart-modal-checkout-container">
								{hasProducts && (
									<span>Total products in cart: {cartState.subTotal}</span>
								)}
								<button
									className={`general-button white ${
										!hasProducts && 'disabled'
									}`}
									disabled={!hasProducts}
									onClick={() => router.push('/cart')}
								>
									CHECKOUT CART
								</button>
								<p>You can choose from these payment options to purchase.</p>
							</div>
						</div>
					) : (
						<div className="loader-container">
							<span className="loader"></span>
						</div>
					)}
				</div>
			)}
			<button className="cart-modal-nav-icon" onClick={() => setOpen(!isOpen)}>
				<CartShopping />
			</button>
		</div>
	);
};

export default CartModalRenderer;
