'use client';
import { getAllProductsByPagination } from '@/requests/SneakersRequest';
import ProductRenderer from '../ProductRenderer';
import FilterRenderer from '@/components/filters/FilterRenderer';

const DefaultProducts = () => {
	return (
		<div className="layout-filter">
			<FilterRenderer />
			<ProductRenderer
				fetchMethod={(page) => getAllProductsByPagination(page, 3)}
				style='products-container width-100'
			/>
		</div>
	);
};

export default DefaultProducts;
