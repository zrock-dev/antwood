import NormalLayout from '@/components/layouts/NormalLayout';
import DefaultProducts from '@/components/products/product_renderers/DefaultProducts';

const ProductsPage = () => {
	return (
		<NormalLayout>
			<DefaultProducts />
		</NormalLayout>
	);
};

export default ProductsPage;
