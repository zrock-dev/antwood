import Layout from '@/components/Layout';
import SingleProductRenderer from '@/components/product/SingleProductRenderer';
import RelatedProductRenderer from '@/components/product/RelatedProducts/RelatedProductRenderer';

const SingleProductPage = ({ params }) => {
	return (
		<Layout>
			<SingleProductRenderer id={params.id} />

			<RelatedProductRenderer id={params.id} />
		</Layout>
	);
};

export default SingleProductPage;
