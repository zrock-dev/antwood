import AdminLayout from '@/components/layouts/AdminLayout';

const AdminProductPage = ({ params }) => {
	return (
		<AdminLayout>
			{params ? (
				<div>
					Admin for product id:
					{params.product[1]}
				</div>
			) : (
				<div>Product Admin</div>
			)}
		</AdminLayout>
	);
};

export default AdminProductPage;
