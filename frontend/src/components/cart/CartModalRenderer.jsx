'use client';

import { CartContext } from '@/context/CartContext';
import CartShopping from '@/icons/CartShopping';
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useState, useRef } from 'react';
import QuantityRenderer from './QuantityRenderer';
import XMark from '@/icons/XMark';

import '../../styles/cart/cartModal.css';
import '../../styles/cart/cart.css';

const CartModalRenderer = () => {
	const router = useRouter();
	const { cartState, products, subTotal, updateProduct } =
		useContext(CartContext);
	const [hasProducts, setHasProducts] = useState(false);
	const [isOpen, setOpen] = useState(false);
	const quantityButton = useRef();

	useEffect(() => {
		if (isOpen) {
			document.body.classList.add('hidden-container');
			document.getElementById('overlay').style.display = 'flex';
		} else {
			document.body.classList.remove('hidden-container');
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
				<>
					{cartState ? (
						<div className="cart-modal-main-container">
							<div>
								<div className="cart-modal-header-container margin-top-15">
									<h2>YOUR CART</h2>
									<button onClick={() => setOpen(false)}>
										<XMark />
									</button>
								</div>
								<div>
									{hasProducts ? (
										<div className="cart-modal-products-container  margin-top-15">
											{products.map((product, index) => (
												<div
													className="cart-modal-product-main-container"
													key={index}
												>
													<img src={product.image} alt="" />
													<div className="cart-modal-product-info-container">
														<h4>{product.name}</h4>
														<span>Size: {product.size}</span>
														<QuantityRenderer
															amount={product.amount}
															quantityAvailable={product.quantity}
															onChange={(amount) =>
																updateProduct({
																	sneakerId: product.sneakerId,
																	sneakerColorId: product.sneakerColorId,
																	size: product.size,
																	amount: amount,
																	price: product.price,
																	quantity: product.quantity
																})
															}
															style="cart-sneaker-amount reverse small"
														/>
														<b>Subtotal: {product.subTotal}$</b>
													</div>
												</div>
											))}
										</div>
									) : (
										<span>You do not have any sneakers in your cart.</span>
									)}
								</div>
							</div>

							<div className="cart-modal-checkout-container margin-top-15">
								{hasProducts && (
									<span className="cart-modal-cart-total">
										Cart total: {subTotal} $
									</span>
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
								<p className="description margin-top-15">
									You can choose from these payment options to purchase.
								</p>
								<img
									src="https://res.cloudinary.com/dex16gvvy/image/upload/v1700097392/solestyle/ggbomtfumdkoggc5gjqk.png"
									alt=""
								/>
							</div>
						</div>
					) : (
						<div className="loader-container">
							<span className="loader"></span>
						</div>
					)}
				</>
			)}
			<button
				className="cart-modal-nav-icon"
				onClick={() => setOpen(!isOpen)}
				title="cart"
			>
				<CartShopping />
				{hasProducts && (
					<span className="cart-modal-nav-amount">{products.length}</span>
				)}
			</button>
		</div>
	);
};

export default CartModalRenderer;
