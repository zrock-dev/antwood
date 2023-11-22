import AdminSubNavbar from '@/components/admin/navbar/AdminSubNavbar';
import AdminGallery from '@/components/admin/products/AdminGallery';
import AdminLayout from '@/components/layouts/AdminLayout';

const AdminMainPage = () => {
	return (
		<AdminLayout>
			<AdminSubNavbar />
			<AdminGallery />
		</AdminLayout>
	);
};

export default AdminMainPage;
