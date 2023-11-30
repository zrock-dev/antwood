'use client';
import { getAllProductsByPagination } from '@/requests/SneakersRequest';
import AdminProductCard from './AdminProductCard';
import ProductRenderer from '@/components/products/ProductRenderer';

const AdminGallery = () => {
	return (
		<ProductRenderer
			fetchMethod={(page, sorter) =>
				getAllProductsByPagination(page, 4, sorter)
			}
			ProductCardView={AdminProductCard}
			redirection="/admin"
		/>
	);
};

export default AdminGallery;
