'use client';
import { getAllProductsByPagination } from '@/requests/SneakersRequest';
import ProductRenderer from '../ProductRenderer';
import PaymentMessage from "@/components/PaymentMessage";
const ProductSuggestions = () => {

	return (
			<>
    <PaymentMessage  />
    <ProductRenderer fetchMethod={getAllProductsByPagination} />;
  </>
	)
};

export default ProductSuggestions;
