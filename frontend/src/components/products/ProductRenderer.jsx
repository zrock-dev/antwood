'use client';

import { useEffect } from 'react';

const ProductRenderer = ({ fetchMethod }) => {
	useEffect(() => {
		fetchMethod(1);
	}, []);
	return <div>products</div>;
};

export default ProductRenderer;
