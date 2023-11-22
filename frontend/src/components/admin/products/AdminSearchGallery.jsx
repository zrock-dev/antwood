'use client';
import ProductRenderer from '@/components/products/ProductRenderer';
import { getSearchByPaginationForAdmin } from '@/requests/SneakersRequest';
import AdminProductCard from './AdminProductCard';

const AdminSearchGallery = ({ input }) => {
	return (
		<ProductRenderer
			fetchMethod={(page) => getSearchByPaginationForAdmin(input, page)}
			ProductCardView={AdminProductCard}
		/>
	);
};

export default AdminSearchGallery;
