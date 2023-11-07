import Layout from '@/components/Layout';
import DefaultProducts from '@/components/products/product_renderers/DefaultProducts';

const ProductsPage = () => {
	return <Layout children={<DefaultProducts />} />;
};

export default ProductsPage;
