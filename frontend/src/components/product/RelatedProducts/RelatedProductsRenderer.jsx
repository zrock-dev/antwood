'use client';

import { useEffect, useState } from 'react';
import { getSneakerByFilters } from '@/requests/SneakersRequest';
import RelatedProductsSection from './RelatedProductsSection';


import '../../styles/product/product_details.css';
import { useRouter } from 'next/navigation';

const RelatedProductsRenderer = ({ id }) => {
	const router = useRouter();
	const [products, setProduct] = useState(null);

	useEffect(() => {
		getSneakerByFilters(id)
			.then((response) => {
				setProduct(response);
			})
			.catch((e) => {
				router.push('/');
			});
	}, [id, router]);

	return product ? (
		<RelatedProductsSection relatedProducts={products} />
	) : (
		<div className="loader-container">
			<span className="loader"></span>
		</div>
	);
};

export default SingleProductRenderer;
