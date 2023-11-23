import "@/styles/elemens/general.css";
import "@/styles/elemens/customizable.css";
import '@/styles/elemens/animations.css';
import "@/styles/elemens/loader.css";
import "@/styles/navbar/navbar.css";
import Navbar from './navbar/Navbar';
import CartProvider from '@/context/CartContext';

const Layout = ({ children }) => {
	return (
		<div>
			<CartProvider>
				<Navbar />
				<div id="overlay"></div>
				{children}
			</CartProvider>
		</div>
	);
};

export default Layout;
