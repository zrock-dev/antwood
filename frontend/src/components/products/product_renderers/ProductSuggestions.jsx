'use client';
import { getAllProductsByPagination } from '@/requests/SneakersRequest';
import ProductRenderer from '../ProductRenderer';
import PaymentMessage from '@/components/PaymentMessage';

const ProductSuggestions = () => {
	return (
		<div className="sub-main-container">
			<PaymentMessage />
			<ProductRenderer
				fetchMethod={(page, sorter) =>
					getAllProductsByPagination(page, 4, sorter)
				}
				style="products-container margin-top-25"
			/>
			;
		</div>
	);
};

export default ProductSuggestions;
