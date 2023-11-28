'use client';
import { getFilterOptions } from '@/requests/SneakersRequest';
import { usePathname } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

export const ProductResultsContext = createContext();
const emptyFilters = {
	brands: [],
	colors: [],
	maxPrice: 0,
	minPrice: 0,
	sizes: [],
	tags: []
};

const ProductResultsProvider = ({ children }) => {
	const pathname = usePathname();
	const [filters, setFilters] = useState(null);

	useEffect(() => {
		if (pathname.includes('products') && !filters) {
			getFilterOptions()
				.then((data) => setFilters(data))
				.catch(() => setFilters(emptyFilters));
		}
	}, []);

	return (
		<ProductResultsContext.Provider value={{filters}}>
			{children}
		</ProductResultsContext.Provider>
	);
};

export default ProductResultsProvider;
