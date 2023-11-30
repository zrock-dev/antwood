'use client';
import { getAllProductsByPagination } from '@/requests/SneakersRequest';
import ProductRenderer from '../ProductRenderer';
import PaymentMessage from "@/components/PaymentMessage";
const ProductSuggestions = () => {

	return (
    <>
      <div className="sub-main-container">
        <PaymentMessage />
        <ProductRenderer fetchMethod={getAllProductsByPagination} />;
      </div>
    </>
  );
};

export default ProductSuggestions;
