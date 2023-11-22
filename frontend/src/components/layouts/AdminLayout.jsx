import AdminNavbar from '../admin/navbar/AdminNavbar';
import Layout from './Layout';
import '../../styles/navbar/subnavbar.css';

const AdminLayout = ({ children }) => {
	return (
		<Layout>
			<AdminNavbar />
			{children}
		</Layout>
	);
};

export default AdminLayout;
