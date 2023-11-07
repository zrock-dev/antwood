'use client';

import '../../styles/products/product_card.css'
import '../../styles/products/products.css'
import { useEffect, useState, useRef } from 'react';
import ProductCard from './ProductCard';

const ProductRenderer = ({ fetchMethod }) => {
	const [products, setProducts] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);

	const lastProduct = useRef(null);

	const fetchMoreProducts = async () => {
		const data = await fetchMethod(page);
		if (data.sneakers.length === 0) {
			setHasMore(false);
		} else {
			setProducts((prev) => [...prev, ...data.sneakers]);
			setPage((prev) => prev + 1);
		}
	};

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (hasMore && entry.isIntersecting) {
					fetchMoreProducts();
				}
			});
		});
		if (observer && lastProduct.current) {
			observer.observe(lastProduct.current);
		}

		return () => {
			if (observer) {
				observer.disconnect();
			}
		};
	}, [products]);
	return (
		<div className='products-main-container'>
			{products.map((product) => (
				<ProductCard product={product} />
			))}
			{hasMore && (
				<div ref={lastProduct}>
					loading items ...
				</div>
			)}
		</div>
	);
};

export default ProductRenderer;
