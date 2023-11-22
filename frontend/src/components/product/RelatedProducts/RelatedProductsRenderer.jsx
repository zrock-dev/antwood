'use client';

import { useEffect, useState } from 'react';
import { getRelatedSneakersById } from '@/requests/SneakersRequest';
import RelatedProductsSection from './RelatedProductsSection';
import '../../../styles/product/related_products.css';

const RelatedProductsRenderer = ({ id }) => {
    const [products, setProducts] = useState([]);

    const getRelateds = async () => {
        try {
          const data = await getRelatedSneakersById(id);
          if (data.sneakers.length === 0) {
            setProducts([]);
          } else {
            setProducts((prev) => [...prev, ...data.sneakers]);
          }
        } catch (error) {
          console.error("Error fetching related sneakers:", error);
        }
      };
    
      useEffect(() => {
        getRelateds(); 
      }, []); 

	return products.length > 0 ? (
        <div> 
            <h2>Related Products</h2>
            <RelatedProductsSection relatedProducts={products} />
        </div>
	) : (

        <div>
            <h2>Related Products</h2>
		    <div className="Not found">
			    <h4>No related products was found</h4>
		    </div>
        </div>
        
	);
};

export default RelatedProductsRenderer;
