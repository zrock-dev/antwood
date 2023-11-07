import Layout from '@/components/Layout';
import SingleProductRenderer from '@/components/product/SingleProductRenderer';
const SingleProductPage = ({ params }) => {
	return <Layout children={<SingleProductRenderer id={params.id} />} />;
};

export default SingleProductPage;
