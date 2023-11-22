import AdminProduct from '@/components/admin/product/AdminProduct';
import AdminLayout from '@/components/layouts/AdminLayout';

const AdminProductPage = ({ params }) => {
	return (
		<AdminLayout>
			<AdminProduct id={params.id} />
		</AdminLayout>
	);
};

export default AdminProductPage;
