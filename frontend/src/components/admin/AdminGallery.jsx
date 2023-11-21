'use client';
import { getAllProductsByPagination } from '@/requests/SneakersRequest';
import ProductRenderer from '../products/ProductRenderer';
import AdminProductCard from './AdminProductCard';

const AdminGallery = () => {
	return (
		<ProductRenderer
			fetchMethod={getAllProductsByPagination}
			ProductCardView={AdminProductCard}
		/>
	);
};

export default AdminGallery;
