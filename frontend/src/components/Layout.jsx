import '../styles/elemens/general.css';
import '../styles/elemens/customizable.css';
import '../styles/elemens/animations.css';
import '../styles/elemens/loader.css';
import '../styles/navbar/navbar.css';
import Navbar from './navbar/Navbar';

const Layout = ({ children }) => {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default Layout;
