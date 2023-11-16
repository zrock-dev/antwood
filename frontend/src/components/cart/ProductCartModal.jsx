'use client';

import QuantityRenderer from './QuantityRenderer';

const ProductCartModal = ({ product, updateProduct }) => {
	const onChangeAmount = (amount) => {
		updateProduct({
			sneakerId: product.sneakerId,
			sneakerColorId: product.sneakerColorId,
			size: product.size,
			amount: amount,
			price: product.price,
			quantity: product.quantity
		});
	};

	return (
		<div className="cart-modal-product-main-container">
			<img src={product.image} alt="" />
			<div className="cart-modal-product-info-container">
				<h4>{product.name}</h4>
				<span>Size: {product.size}</span>
				<QuantityRenderer
					amount={product.amount}
					quantity={product.quantity}
					onChange={onChangeAmount}
				/>
				<b>Subtotal: {product.subTotal}</b>
			</div>
		</div>
	);
};

export default ProductCartModal;
