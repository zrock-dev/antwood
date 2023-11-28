import AdminPanelRenderer from "@/components/admin-panel/AdminPanelRenderer";
import AdminLayout from "@/components/layouts/AdminLayout";

const AdminProductPage = ({ params }) => {
  return (
    <AdminLayout>
      <AdminPanelRenderer id={params.id} />
    </AdminLayout>
  );
};

export default AdminProductPage;
