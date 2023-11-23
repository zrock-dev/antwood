'use client';

import { CartContext } from '@/context/CartContext';
import { useContext, useEffect, useState } from 'react';
import TrashCan from '@/icons/TrashCan';
import Modal from '@/path-to-your-modal-component';
import { removeProduct } from '@/context/CartContext';
import { checkSneakerExistence } from '@/requests/SneakersRequest';

import '../../styles/cart/cart.css';
import '../../styles/cart/cartPage.css';
import QuantityRenderer from './QuantityRenderer';
import Link from 'next/link';

const CartRenderer = () => {
	const { cartState, products, updateProduct, removeProduct } =
		useContext(CartContext);
	const [hasProducts, setHasProducts] = useState(false);
	const [isModalOpen, setModalOpen] = useState(false);

	useEffect(() => {
		if (cartState) {
			setHasProducts(products.length > 0);
		}
	}, [cartState]);

	return cartState ? (
		<div className="cart-page-main-container">
			{hasProducts ? (
				<div>
				<h2 className="cart-page-title">YOUR CART</h2>
				<div className="cart-page-products-container margin-top-15">
					{products.map(async (product, index) => {
						const sneakerExist = await checkSneakerExistence(product.sneakerId);

						if (sneakerExist) {
							return (
								<div className="cart-page-product-container" key={index}>
									<img src={product.image} alt="" />
									<div className="cart-page-product-info-container">
										<div className="column-container">
											<div className="cart-page-product-details">
												<h4>{product.name}</h4>
												<button
													onClick={() => {
														removeProduct({
															sneakerId: product.sneakerId,
															sneakerColorId: product.sneakerColorId,
															size: product.size,
															subTotal: product.subTotal
														});
													}}
												>
													<TrashCan />
												</button>
											</div>
											<span>Price: {product.price} $</span>
											<span>Subtotal: {product.subTotal} $</span>
										</div>
										<div className="cart-page-product-details">
											<h3 className="cart-page-amount">Size {product.size}</h3>
											<QuantityRenderer
												text="Quantity"
												amount={product.amount}
												quantityAvailable={product.quantity}
												onChange={(amount) => {
													updateProduct({
														sneakerId: product.sneakerId,
														sneakerColorId: product.sneakerColorId,
														size: product.size,
														amount: amount,
														price: product.price,
														quantity: product.quantity
													});
												}}
												style="cart-sneaker-amount cart-page-amount amount-button small"
											/>
										</div>
									</div>
								</div>
							);
						} else {
							
							removeProduct({
								sneakerId: product.sneakerId,
								sneakerColorId: product.sneakerColorId,
								size: product.size,
								subTotal: product.subTotal
							});

							return (
								<div key={index}>
									<Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen}>
										<p>The product <strong>{product.name}</strong> with ID{' '}
										<strong>{product.sneakerId}</strong> is not available in out of stock.</p>
										<button onClick={() => setModalOpen(false)}>Close</button>
									</Modal>
								</div>
							);
						}
					})}
				</div>
			</div>
			) : (
				<div className="cart-empty">
					<span className="cart-page-title">
						You do not have any sneakers in your cart.
					</span>
					<p>
						Discover your unique style in our virtual store! In every corner of
						our catalog, you will find a wide range of products that adapt to
						your personality and highlight your essence.
					</p>
					<Link href="/products">
						<h4 className="general-button">GO TO SNEAKERS</h4>
					</Link>
				</div>
			)}

			<div className="cart-page-info-container">
				<h2 className="cart-page-title">SUMMARY</h2>
				<b>Subtotal: {cartState.subTotal} $</b>
				<b>Shipping & Handling: {hasProducts ? cartState.extra : 0} $</b>
				<span className="horizontal-separator"></span>
				<b>TOTAL {hasProducts ? cartState.total : 0} $</b>
				<span className="horizontal-separator"></span>

				<p className="description">
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
					onClick={() => alert('THE PAYMENT METHOD WILL BE COMING SOON')}
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
