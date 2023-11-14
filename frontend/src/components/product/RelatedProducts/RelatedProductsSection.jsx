import React from 'react';
import ProductCard from './ProductCard';

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className="related-products-main">
      <div className="related-products-title">
      <h2>Related Products</h2>
            <div className="related-products-container">
                  {relatedProducts.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
            </div>
      </div>
    </div>
  );
};

export default RelatedProducts;
