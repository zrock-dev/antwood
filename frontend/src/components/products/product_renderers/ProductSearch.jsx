'use client';
import { getSearchByPagination } from '@/requests/SneakersRequest';
import ProductRenderer from '../ProductRenderer';
import FilterRenderer from '@/components/filters/FilterRenderer';

const ProductSearch = ({ input }) => {
	return (
		<div className="layout-filter">
			<FilterRenderer />
			<ProductRenderer
				fetchMethod={(page) => getSearchByPagination(input, page)}
				style='products-container width-100'
			/>
		</div>
	);
};

export default ProductSearch;
