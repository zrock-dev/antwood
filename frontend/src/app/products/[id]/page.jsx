import NormalLayout from '@/components/layouts/NormalLayout';
import SingleProductRenderer from '@/components/product/SingleProductRenderer';
const SingleProductPage = ({ params }) => {
	return (
		<NormalLayout>
			<SingleProductRenderer id={params.id} />
		</NormalLayout>
	);
};

export default SingleProductPage;
