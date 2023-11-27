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
			<ProductRenderer fetchMethod={getAllProductsByPagination} />;
		</div>
	);
};

export default ProductSuggestions;
