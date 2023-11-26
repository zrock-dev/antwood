import AdminPanelRenderer from '@/components/admin-panel/AdminPanelRenderer';
import AdminLayout from '@/components/layouts/AdminLayout';

const EmptyAdminProduct = () => {
	return (
    <AdminLayout>
      <AdminPanelRenderer />
    </AdminLayout>
  );
};

export default EmptyAdminProduct;
