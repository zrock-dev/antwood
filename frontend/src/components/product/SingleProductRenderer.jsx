'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductDetails from './ProductDetails';
import { getSneakerById } from '@/requests/SneakersRequest';

import '../../styles/product/product_details.css';
import '../../styles/cart/cart.css';
import ProductReview from '../reviews/ProductReview';

const SingleProductRenderer = ({ id }) => {
	const router = useRouter();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		getSneakerById(id)
			.then((response) => {
				if (response.types.length === 0) {
					throw new Error('Product not found');
				}
				setProduct(response);
			})
			.catch((e) => {
				router.push('/');
			});
	}, [id, router]);

	return product ? (
		<>
			<ProductDetails product={product} />
			<ProductReview product={product} />
		</>
	) : (
		<div className="loader-container">
			<span className="loader"></span>
		</div>
	);
};

export default SingleProductRenderer;
