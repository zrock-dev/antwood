'use client';

import { useEffect, useState } from 'react';
import ProductDetails from './ProductDetails';
import { getSneakerById } from '@/requests/SneakersRequest';

const SingleProductRenderer = ({ id }) => {
	const [product, setProduct] = useState(null);

	useEffect(() => {
		getSneakerById(id)
			.then((response) => {
				setProduct(response);
			})
			.catch((e) => {
				alert(e.message);
			});
	}, []);
	return product ? (
		<ProductDetails product={product} />
	) : (
		<div className="loader-container">
			<span className="loader"></span>
		</div>
	);
};

export default SingleProductRenderer;
