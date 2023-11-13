import React from 'react';
import ProductCard from './ProductCard';

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className="related-products-main">
      <div className="related-products-title">
      <h2>Related Products</h2>
            <RelatedProducts relatedProducts={relatedProducts} />
      </div>
    </div>
  );
};

export default RelatedProducts;
