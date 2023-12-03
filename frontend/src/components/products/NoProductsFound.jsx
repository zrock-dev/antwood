import SearchIcon from '@/icons/SearchIcon';
import '../../styles/products/noResults.css';

const NoProductsFound = ({ redirection }) => {
	return (
		<div className="no-found-main-container">
			<h1 className="no-found-title ">
				<SearchIcon /> No product found
			</h1>
			<p className="no-found-description">
				Discover your unique style in our virtual store! In every corner of our
				catalog, you will find a wide range of products that adapt to your
				personality and highlight your essence.
			</p>
			<span className="vertical-separator"></span>
			<span>
				<button onClick={redirection} className="general-button auto">
					SEE ALL SNEAKERS
				</button>
			</span>
		</div>
	);
};

export default NoProductsFound;
