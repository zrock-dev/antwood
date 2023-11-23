import NormalLayout from '@/components/layouts/NormalLayout';
import ProductSearch from '@/components/products/product_renderers/ProductSearch';

const SearchPage = ({ params }) => {
	return (
		<NormalLayout>
			<ProductSearch input={params.input} />
		</NormalLayout>
	);
};

export default SearchPage;
