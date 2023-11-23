'use client';
import { getAllProductsByPagination } from '@/requests/SneakersRequest';
import ProductRenderer from '../ProductRenderer';

const DefaultProducts = () => {
	return <ProductRenderer fetchMethod={getAllProductsByPagination} />;
};

export default DefaultProducts;
