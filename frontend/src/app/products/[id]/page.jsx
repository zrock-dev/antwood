import Layout from '@/components/Layout';
import SingleProductRenderer from '@/components/product/SingleProductRenderer';

const SingleProductPage = ({ params }) => {
	return (
		<Layout>
			<SingleProductRenderer id={params.id} />
		</Layout>
	);
};

export default SingleProductPage;
