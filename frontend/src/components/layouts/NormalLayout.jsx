import CartProvider from '@/context/CartContext';
import Navbar from '../navbar/Navbar';
import Layout from './Layout';
import ProductResultsProvider from '@/context/ProductResultsContext';

const NormalLayout = ({ children }) => {
	return (
		<Layout>
			<CartProvider>
				<ProductResultsProvider>
					<Navbar />
					<div id="overlay"></div>
					{children}
				</ProductResultsProvider>
			</CartProvider>
		</Layout>
	);
};

export default NormalLayout;
