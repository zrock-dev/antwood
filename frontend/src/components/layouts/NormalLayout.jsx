import CartProvider from '@/context/CartContext';
import Navbar from '../navbar/Navbar';
import Footer from '../landing_page/Footer'
import Layout from './Layout';

const NormalLayout = ({ children }) => {
	return (
		<Layout>
			<CartProvider>
				<Navbar />
				<div id="overlay"></div>
				{children}
				<Footer/>
			</CartProvider>
		</Layout>
	);
};

export default NormalLayout;
