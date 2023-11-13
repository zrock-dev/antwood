import React from 'react';
import ProductCard from './ProductCard';

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className="related-products-container">
      {relatedProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}
    </div>
  );
};

export default RelatedProducts;
