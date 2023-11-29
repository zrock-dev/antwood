import CartProvider from '@/context/CartContext';
import Navbar from '../navbar/Navbar';
import Layout from './Layout';

const NormalLayout = ({ children }) => {
	return (
		<Layout>
			<CartProvider>
				<Navbar />
				<div id="overlay"></div>
				{children}
			</CartProvider>
		</Layout>
	);
};

export default NormalLayout;
