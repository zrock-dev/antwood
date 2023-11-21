'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import ProductDetails from './ProductDetails';
import { getSneakerById } from '@/requests/SneakersRequest';

import '../../styles/product/product_details.css';
import '../../styles/cart/cart.css';
import ProductReview from '../reviews/ProductReview';
import RelatedProductsRenderer from './RelatedProducts/RelatedProductsRenderer';

const SingleProductRenderer = ({ id }) => {
	const router = useRouter();
	const [product, setProduct] = useState(null);

	useEffect(() => {
		getSneakerById(id)
			.then((response) => {
				setProduct(response);
			})
			.catch((e) => {
				router.push('/');
			});
	}, [id, router]);

	return product ? (
    <>
		<ProductDetails product={product} />
		<ProductReview  product={product}/>
        <RelatedProductsRenderer id={id} />
	</>

	) : (
		<div className="loader-container">
			<span className="loader"></span>
		</div>
	);
};

export default SingleProductRenderer;
