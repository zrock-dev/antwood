import SingleProductRenderer from '@/components/product/SingleProductRenderer';

const SingleProductPage = ({ params }) => {
	return <SingleProductRenderer id={params.id} />;
};

export default SingleProductPage;
