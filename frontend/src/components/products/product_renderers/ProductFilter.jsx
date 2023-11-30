'use client';
import { useContext, useEffect, useState, useRef } from 'react';
import { getSneakerFilteredByPagination } from '@/requests/SneakersRequest';
import ProductCard from '../ProductCard';
import { ProductResultsContext } from '@/context/ProductResultsContext';
import FilterRenderer from '@/components/filters/FilterRenderer';
import NoProductsFound from '../NoProductsFound';
import '../../../styles/products/product_card.css';
import '../../../styles/products/products.css';
import SubNavbar from '@/components/navbar/SubNavbar';

const ProductFilter = ({ style = 'products-container width-100' }) => {
	const [products, setProducts] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [page, setPage] = useState(1);
	const { sorter, filters, isEmptyFilters } = useContext(ProductResultsContext);

	const lastProduct = useRef(null);

	const fetchMoreProducts = async () => {
		if (!isEmptyFilters(filters)) {
			const data = await getSneakerFilteredByPagination(
				filters,
				page,
				3,
				sorter
			);
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
		setProducts([]);
		setHasMore(true);
		setPage(1);
	}, [sorter]);

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
			<SubNavbar />
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
