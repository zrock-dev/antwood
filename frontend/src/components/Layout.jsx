import '../styles/elemens/general.css';
import '../styles/elemens/customizable.css';
import '../styles/elemens/animations.css';
import '../styles/elemens/loader.css';
import '../styles/navbar/navbar.css';
import Navbar from './navbar/Navbar';
import AlertProvider from '@/context/AlertProvider';

const Layout = ({ children }) => {
	return (
		<AlertProvider>
			<Navbar />
			{children}
		</AlertProvider>
	);
};

export default Layout;
