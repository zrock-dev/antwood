'use client';

import { useEffect, useState } from 'react';
import { getRelatedSneakersById } from '@/requests/SneakersRequest';
import RelatedProductsSection from './RelatedProductsSection';


import '../../../styles/product/related_products.css';
import { useRouter } from 'next/navigation';

const RelatedProductsRenderer = ({ id }) => {
	const router = useRouter();
    const [products, setProducts] = useState(null);

	for (let i = 1; i <= 5; i++) {
        console.log(i);
    }

	useEffect(() => {
		getRelatedSneakersById(id)
			.then((response) => {
				setProducts(response);
			})
			.catch((e) => {
				console.error("Error fetching related sneakers:", e)
				router.push('/');
			});
	}, [id, router]);

	return products ? (
		<RelatedProductsSection relatedProducts={products} />
	) : (
		<div className="loader-container">
			<span className="loader"></span>
		</div>
	);
};

export default SingleProductRenderer;
