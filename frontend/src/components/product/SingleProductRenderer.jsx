'use client';

import { useEffect, useState } from 'react';
import ProductDetails from './ProductDetails';
import { getSneakerById } from '@/requests/SneakersRequest';

import '../../styles/product/product_details.css';
import { useRouter } from 'next/navigation';
import ProductReview from '../reviews/ProductReview';

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

	return product ? (<>
		<ProductDetails product={product} />
		<ProductReview  product={product}/>
        <RelatedProductRenderer id={id} />
	</>

	) : (
		<div className="loader-container">
			<span className="loader"></span>
		</div>
	);
};

export default SingleProductRenderer;
