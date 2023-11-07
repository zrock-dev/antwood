import ArrowLeft from '@/icons/ArrowLeft';
import ArrowRight from '@/icons/ArrowRight';
import { useEffect, useState } from 'react';

const ProductDetails = ({ product }) => {
	const [color, setColor] = useState({
		colorIndex: 0,
		imageIndex: 0
	});

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

	return (
		<div className="product-details-main-container">
			<div className="product-details-color-container">
				<div>
					<h1 className="product-details-color-name">{product.name}</h1>
					<span>{product.price} $</span>
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
				<div>
					<span>Shoe size</span>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
						quasi.
					</p>
					{colorData.sizes.map((size, index) => (
						<span key={index}>{size} - </span>
					))}
				</div>
				<div>
					<span>Colors</span>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni,
						quasi.
					</p>
					{product.types.map((type, index) => (
						<div
							key={index}
							onClick={() => setColor({ imageIndex: 0, colorIndex: index })}
							className={`product-details-images-image ${
								index === color.colorIndex && 'selected'
							}`}
						>
							<img src={type.images[0].url} alt="" />
						</div>
					))}
				</div>
				<div>
					<span>description</span>
					<p>{product.description}</p>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
