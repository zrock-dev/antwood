'use client';
import { getFilterOptions } from '@/requests/SneakersRequest';
import { usePathname, useRouter } from 'next/navigation';
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
	const router = useRouter();
	const [filters, setFilters] = useState(null);

	const setBrand = (brand) => {
		setFilters({
			...filters,
			brand
		});
	};

	useEffect(() => {
		if (pathname.includes('/products') && !filters) {
			getFilterOptions()
				.then((data) => setFilters(data))
				.catch(() => setFilters(emptyFilters));
		}
	}, []);

	useEffect(() => {
		if (filters) {
			// router.push('/products/filter?brand=converse&tags=men', {
			// 	query: {
			// 		brand: filters.brand
			// 	}
			// });
		}
	}, [filters]);

	return (
		<ProductResultsContext.Provider value={{ filters, setBrand }}>
			{children}
		</ProductResultsContext.Provider>
	);
};

export default ProductResultsProvider;
