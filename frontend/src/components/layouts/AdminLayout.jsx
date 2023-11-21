import AdminNavbar from '../admin/navbar/AdminNavbar';
import Layout from './Layout';

const AdminLayout = ({ children }) => {
	return (
		<Layout>
			<AdminNavbar />
			{children}
		</Layout>
	);
};

export default AdminLayout;
