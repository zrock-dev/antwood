import React from 'react';
import ProductCard from './ProductCard';

const RelatedProducts = ({ relatedProducts }) => {
  return (
    <div className="related-products-container">

      {relatedProducts.map((product) => (
        <ProductCard key={product._id} product={product} />
      ))}

      {/* Sección de productos relacionados */}
            <h2>Related Products</h2>
            <RelatedProducts relatedProducts={relatedProducts} />

            {/* Paginación */}
            <div className="pagination-container">
              <button onClick={() => onPageChange('prev')}>Anterior</button>
              <button onClick={() => onPageChange('next')}>Siguiente</button>
            </div>
    </div>
  );
};

export default RelatedProducts;
