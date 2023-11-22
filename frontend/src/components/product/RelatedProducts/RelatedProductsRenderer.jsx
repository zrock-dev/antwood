'use client';

import { useEffect, useState } from 'react';
import { getRelatedSneakersById } from '@/requests/SneakersRequest';
import RelatedProductsSection from './RelatedProductsSection';
import '../../../styles/product/related_products.css';

const RelatedProductsRenderer = ({ id }) => {
    const [products, setProducts] = useState([]);

	useEffect(() => {
        getRelatedSneakersById(id)
            .then((response) => {
                setProducts(response);
            })
            .catch((e) => {
                console.error("Error fetching related sneakers:", e);
            });
    }, [id]);

	return products ? (
		<RelatedProductsSection relatedProducts={products} />
	) : (
		<div className="loader-container">
			<span className="loader"></span>
		</div>
	);
};

export default RelatedProductsRenderer;
