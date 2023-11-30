import '../../styles/elemens/general.css';
import '../../styles/elemens/customizable.css';
import '../../styles/elemens/animations.css';
import '../../styles/elemens/loader.css';
import '../../styles/navbar/navbar.css';
import ProductResultsProvider from '@/context/ProductResultsContext';

const Layout = ({ children }) => {
	return (
		<div>
			<ProductResultsProvider>
				<div id="overlay"></div>
				{children}
			</ProductResultsProvider>
		</div>
	);
};

export default Layout;
