'use client';
import { getSearchByPagination } from '@/requests/SneakersRequest';
import ProductRenderer from '../ProductRenderer';

const ProductSearch = ({ input }) => {
	return (
		<ProductRenderer
			fetchMethod={(page) => getSearchByPagination(input, page)}
		/>
	);
};

export default ProductSearch;
