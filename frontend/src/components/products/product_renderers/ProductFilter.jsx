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
	const [rendererState, setRendererState] = useState({
		products: [],
		hasMore: true,
		page: 1
	});
	const { sorter, filters, isEmptyFilters } = useContext(ProductResultsContext);

	const lastProduct = useRef(null);

	const fetchMoreProducts = async () => {
		if (!isEmptyFilters(filters)) {
			const data = await getSneakerFilteredByPagination(
				filters,
				rendererState.page,
				3,
				sorter
			);
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
		}
	};

	useEffect(() => {
		if (isEmptyFilters()) {
			setRendererState({
				products: [],
				hasMore: false,
				page: 1
			});
		} else {
			setRendererState({
				products: [],
				hasMore: true,
				page: 1
			});
		}
	}, [filters]);

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
		<div className="layout-filter">
			<SubNavbar />
			<FilterRenderer />
			<div className="products-main-container">
				<div className={style}>
					{rendererState.products.map((product) => (
						<ProductCard key={product._id} product={product} />
					))}
				</div>
				{!rendererState.hasMore && rendererState.products.length < 1 && (
					<NoProductsFound redirection={'/products'} />
				)}
				{rendererState.hasMore && (
					<div ref={lastProduct} className="loader-container">
						<span className="loader"></span>
					</div>
				)}
			</div>
		</div>
	);
};

export default ProductFilter;
