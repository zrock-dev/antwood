'use client';
import { useContext, useEffect, useState, useRef } from 'react';
import { getSneakerFilteredByPagination } from '@/requests/SneakersRequest';
import ProductCard from '../ProductCard';
import { ProductResultsContext } from '@/context/ProductResultsContext';
import FilterRenderer from '@/components/filters/FilterRenderer';
import NoProductsFound from '../NoProductsFound';
import '../../../styles/products/product_card.css';
import '../../../styles/products/products.css';

const ProductFilter = ({ style = 'products-container' }) => {
	const [products, setProducts] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const { filters, isEmptyFilters } = useContext(ProductResultsContext);

	const lastProduct = useRef(null);

	const fetchMoreProducts = async () => {
		if (!isEmptyFilters(filters)) {
			const data = await getSneakerFilteredByPagination(filters, page, 3);
			if (data.sneakers.length === 0) {
				setHasMore(false);
			} else {
				setProducts((prev) => [...prev, ...data.sneakers]);
				setPage((prev) => prev + 1);
			}
		}
	};

	useEffect(() => {
		if (isEmptyFilters()) {
			setProducts([]);
			setHasMore(false);
			setPage(1);
		} else {
			setProducts([]);
			setHasMore(true);
			setPage(1);
		}
	}, [filters]);

	useEffect(() => {
		console.log(products);
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
		<div className="layout-filter">
			<FilterRenderer />
			<div className="products-main-container">
				<div className={style}>
					{products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
				{!hasMore && products.length < 1 && (
					<NoProductsFound redirection={'/products'} />
				)}
				{hasMore && (
					<div ref={lastProduct} className="loader-container">
						<span className="loader"></span>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductFilter;
