import React from 'react';
import ProductCard from '../../products/ProductCard';


const RelatedProductsSection = ({ relatedProducts = [] }) => {

  return (
    <div className="related-products-main">

            <div className="related-products-container">
              {Array.isArray(relatedProducts) &&
              relatedProducts.map((product) => {
                if (!product || !product._id) {
                  console.error('Invalid Product:', product);
                  return null; 
                }
                return <ProductCard key={product._id} product={product} />;
              })}
            </div>
      
    </div>
  );
};

export default RelatedProductsSection;
