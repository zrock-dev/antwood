'use client';
import ArrowLeft from '@/icons/ArrowLeft';
import ArrowRight from '@/icons/ArrowRight';
import { useContext, useEffect, useState } from 'react';
import DetailSection from './DetailSection';
import QuantityRenderer from '../cart/QuantityRenderer';
import { CartContext } from '@/context/CartContext';
import { getItem, isValidToRequestStorage } from '@/utils/StorageManagement';
import { stringToJson } from '@/utils/Parser';

const ProductDetails = ({ product }) => {
	const { addSneaker, removeProduct, updateProduct, equalsProduct } =
		useContext(CartContext);
	const [color, setColor] = useState({
		colorIndex: 0,
		imageIndex: 0,
		sizeIndex: 0,
		amount: 1,
		onCart: false
	});
	const [dataLoaded, setColorLoaded] = useState(false);

	const colorData = product.types[color.colorIndex];

	const nextImage = () => {
		setColor({
			...color,
			imageIndex:
				color.imageIndex === colorData.images.length - 1
					? 0
					: color.imageIndex + 1
		});
	};

	const backImage = () => {
		setColor({
			...color,
			imageIndex:
				color.imageIndex === 0
					? colorData.images.length - 1
					: color.imageIndex - 1
		});
	};

	const addToCart = () => {
		addSneaker(
			product._id,
			colorData.ID,
			color.amount,
			colorData.sizes[color.sizeIndex].value,
			product.price,
			colorData.sizes[color.sizeIndex].quantity
		);
		setColor({
			...color,
			onCart: true
		});
	};

	const removeToCart = () => {
		removeProduct({
			snakerId: product._id,
			sneakerColorId: colorData.ID,
			size: colorData.sizes[color.sizeIndex].value,
			subTotal: color.amount * product.price
		});
		setColor({
			...color,
			onCart: false
		});
	};

	const verifyProductOnCart = () => {
		if (isValidToRequestStorage) {
			let cart = getItem('cart');
			if (cart) {
				cart = stringToJson(cart);
				let wasFound = false;
				cart.products.map((productCart) => {
					if (
						equalsProduct(productCart, {
							snakerId: product._id,
							sneakerColorId: colorData.ID,
							size: colorData.sizes[color.sizeIndex].value
						})
					) {
						setColor({
							...color,
							amount: productCart.amount,
							onCart: true
						});
						wasFound = true;
					}
				});

				if (!wasFound) {
					setColor({
						...color,
						amount: 1,
						onCart: false
					});
				}
			}
		}
		setColorLoaded(true);
	};

	useEffect(verifyProductOnCart, []);
	useEffect(verifyProductOnCart, [color.colorIndex, color.sizeIndex]);
	useEffect(() => {
		if (color.onCart && dataLoaded) {
			console.log('updating...');
			updateProduct({
				snakerId: product._id,
				sneakerColorId: colorData.ID,
				size: colorData.sizes[color.sizeIndex].value,
				amount: color.amount,
				price: product.price,
				quantity: colorData.sizes[color.sizeIndex].quantity
			});
		}
	}, [color.amount]);

	return (
		<div className="product-details-main-container">
			<div className="product-details-color-container">
				<div className="product-details-header">
					<h1 className="product-details-color-name">{product.name}</h1>
					<span className="product-details-color-price">{product.price} $</span>
				</div>
				<div className="product-details-color-image-container">
					<button
						className="product-details-color-directions"
						onClick={backImage}
					>
						<ArrowLeft />
					</button>
					<div className="product-details-color-image">
						<img src={colorData.images[color.imageIndex].url} alt="" />
					</div>
					<button
						className="product-details-color-directions"
						onClick={nextImage}
					>
						<ArrowRight />
					</button>
				</div>
				<div className="product-details-images-container">
					{colorData.images.map((image, index) => (
						<div
							className={`product-details-images-image ${
								color.imageIndex === index && 'selected'
							}`}
							onClick={() => setColor({ ...color, imageIndex: index })}
							key={index}
						>
							<img src={image.url} alt="" />
						</div>
					))}
				</div>
			</div>
			<div className="product-details-information-container">
				<DetailSection
					title="Shoe Sizes"
					description="We have these sizes available for this sneaker in this color"
				>
					<div className="secction-item-row">
						{colorData.sizes.map((size, index) => (
							<button
								className={`sneaker-size ${
									color.sizeIndex === index && 'selected'
								}`}
								key={index}
								onClick={() => setColor({ ...color, sizeIndex: index })}
							>
								{size.value}
							</button>
						))}
					</div>
				</DetailSection>
				<DetailSection
					title="Colors"
					description="We have these colors available so you can choose for your collection"
				>
					<div className="secction-item-row">
						{product.types.map((type, index) => (
							<div
								key={index}
								onClick={() =>
									setColor({
										imageIndex: 0,
										colorIndex: index,
										sizeIndex: 0,
										amount: 1
									})
								}
								className={`product-details-images-image gray ${
									index === color.colorIndex && 'selected'
								}`}
							>
								<img src={type.images[0].url} alt="" />
							</div>
						))}
					</div>
				</DetailSection>
				<DetailSection title="Description">
					<p className="product-details-color-description">
						{product.description}
					</p>
				</DetailSection>
				<div className="product-details-cart-management">
					<QuantityRenderer
						quantity={colorData.sizes[color.sizeIndex].quantity}
						amount={color.amount}
						onChange={(amount) => setColor({ ...color, amount })}
					/>
					<button
						onClick={color.onCart ? removeToCart : addToCart}
						disabled={colorData.sizes[color.sizeIndex].quantity <= 0}
						className={`general-button ${
							colorData.sizes[color.sizeIndex].quantity <= 0 && 'disabled'
						}`}
					>
						{color.onCart ? 'REMOVE FROM CART' : 'ADD TO THE CART'}
					</button>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
