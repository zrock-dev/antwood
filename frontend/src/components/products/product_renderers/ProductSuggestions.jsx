'use client';
import { getAllProductsByPagination } from '@/requests/SneakersRequest';
import ProductRenderer from '../ProductRenderer';
import { CartContext } from '@/context/CartContext';
import { useContext } from 'react';
import PaymentMessage from '@/components/PaymentMessage';
const ProductSuggestions = () => {
	const { resetCartState } = useContext(CartContext);
	return (
		<div className="sub-main-container">
			<PaymentMessage resetCartState={resetCartState} />
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
