'use client';
import { getAllProductsByPagination } from '@/requests/SneakersRequest';
import ProductRenderer from '../ProductRenderer';

const ProductSuggestions = () => {
	return <ProductRenderer fetchMethod={getAllProductsByPagination} />;
};

export default ProductSuggestions;
