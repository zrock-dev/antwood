import Layout from '@/components/Layout';
import SingleProductRenderer from '@/components/product/SingleProductRenderer';
import RelatedProductRenderer from '@/components/product/RelatedProducts/RelatedProductsRenderer';

const SingleProductPage = ({ params }) => {
	return (
		<Layout>
			<SingleProductRenderer id={params.id} />

            <div>
                <RelatedProductRenderer id={params.id} />
            </div>

		</Layout>
	);
};

export default SingleProductPage;
