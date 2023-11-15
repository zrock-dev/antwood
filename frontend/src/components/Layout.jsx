import '../styles/elemens/general.css';
import '../styles/elemens/customizable.css';
import '../styles/elemens/animations.css';
import '../styles/elemens/loader.css';
import '../styles/navbar/navbar.css';
import Navbar from './navbar/Navbar';
import SideModal from './shopping_Cart/Shopping_Cart_Modal';

const Layout = ({ children }) => {
	return (
		<div>
			<Navbar />
			<SideModal />
			{children}
		</div>
	);
};

export default Layout;
