'use client';

import '../../styles/products/product_card.css';
import '../../styles/products/products.css';
import { useEffect, useState, useRef, useContext } from 'react';
import ProductCard from './ProductCard';
import NoProductsFound from './NoProductsFound';
import { ProductResultsContext } from '@/context/ProductResultsContext';

const ProductRenderer = ({
	fetchMethod,
	ProductCardView = ProductCard,
	redirection = '/products',
	style = 'products-container'
}) => {
	const [rendererState, setRendererState] = useState({
		products: [],
		hasMore: true,
		page: 1
	});
	const { sorter } = useContext(ProductResultsContext);

	const lastProduct = useRef(null);

	const fetchMoreProducts = async () => {
		console.log('fetching...');
		const data = await fetchMethod(rendererState.page, sorter);
		if (data.sneakers.length === 0) {
			setRendererState({
				...rendererState,
				hasMore: false
			});
		} else {
			setRendererState({
				...rendererState,
				products: [...rendererState.products, ...data.sneakers],
				page: rendererState.page + 1
			});
		}
	};

	useEffect(() => {
		setRendererState({
			products: [],
			hasMore: true,
			page: 1
		});
	}, [sorter]);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (rendererState.hasMore && entry.isIntersecting) {
					fetchMoreProducts();
					console.log('nose');
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
	}, [rendererState.products]);

	return (
		<div className="products-main-container">
			<div className={style}>
				{rendererState.products.map((product) => (
					<ProductCardView key={product._id} product={product} />
				))}
			</div>
			{rendererState.products.length < 1 && !rendererState.hasMore && (
				<NoProductsFound redirection={redirection} />
			)}
			{rendererState.hasMore && (
				<div ref={lastProduct} className="loader-container">
					<span className="loader"></span>
				</div>
			)}
		</div>
	);
};

export default ProductRenderer;
