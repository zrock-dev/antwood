import { useState } from 'react';

const ProductDetails = ({ product }) => {
	const [color, setColor] = useState({
		colorIndex: 0,
		imageIndex: 0
	});

	const [colorData, setColorData] = useState(product.types[color.colorIndex]);

	return (
		<div>
			<div>
				<div>
					<h1>{product.name}</h1>
					<span>{product.price}</span>
				</div>
				<div>
					<button>left</button>
					<img src={colorData.images[color.imageIndex].url} alt="" />
					<button>right</button>
				</div>
				<div>
					{colorData.images.map((image, index) => (
						<img key={index} src={image.url} alt="" />
					))}
				</div>
			</div>
			<div>
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
						<img
							src={type.images[0].url}
							alt=""
							className={`${index === color.colorIndex && 'selected'}`}
						/>
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
