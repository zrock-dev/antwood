'use client';
import FilterRenderer from '@/components/filters/FilterRenderer';
import ProductRenderer from '../ProductRenderer';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { getAllProductsByPagination } from '@/requests/SneakersRequest';

const ProductFilter = () => {
	const params = useSearchParams();

	useEffect(() => {
		console.log(params.get('brand'));
		console.log(params.get('tags'));
	}, []);

	return (
		<div className="layout-filter">
			<FilterRenderer />
			<ProductRenderer
				fetchMethod={(page) => getAllProductsByPagination(page, 3)}
				style="products-container width-100"
			/>
		</div>
	);
};

export default ProductFilter;
