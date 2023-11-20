import Layout from '@/components/Layout';
import ProductSearch from '@/components/products/product_renderers/ProductSearch';

const SearchPage = ({ params }) => {
	return (
		<Layout>
			<ProductSearch input={params.input} />
		</Layout>
	);
};

export default SearchPage;
