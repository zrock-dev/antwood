'use client';

import { useEffect, useState } from 'react';
import { getSneakerById } from '@/requests/SneakersRequest';

import '../../styles/product/product_details.css';
import { useRouter } from 'next/navigation';

const RelatedProductRenderer = ({ id }) => {
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
		<ProductDetails product={product} />
	) : (
		<div className="loader-container">
			<span className="loader"></span>
		</div>
	);
};

export default SingleProductRenderer;
