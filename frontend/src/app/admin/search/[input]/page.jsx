import AdminSearchGallery from '@/components/admin/products/AdminSearchGallery';
import AdminLayout from '@/components/layouts/AdminLayout';

const AdminSearchPage = ({ params }) => {
	return (
		<AdminLayout>
			<AdminSearchGallery input={params.input} />
		</AdminLayout>
	);
};

export default AdminSearchPage;
