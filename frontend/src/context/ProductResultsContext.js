'use client';
import { getFilterOptions } from '@/requests/SneakersRequest';
import { usePathname, useRouter } from 'next/navigation';
import { createContext, useEffect, useState } from 'react';

export const ProductResultsContext = createContext();
const emptyFilterOptions = {
	brands: [],
	colors: [],
	maxPrice: 0,
	minPrice: 0,
	sizes: [],
	tags: []
};

const emptyFilters = {
	brand: '',
	color: '',
	minPrice: 0,
	maxPrice: 0,
	size: 0,
	tags: []
};

const isEmptyFilters = (filters, filterOptions) => {
	return (
		filters.brand === '' &&
		filters.color === '' &&
		(filters.minPrice === 0 || filters.minPrice === filterOptions.minPrice) &&
		(filters.maxPrice === 0 || filters.maxPrice === filterOptions.maxPrice) &&
		filters.size === 0 &&
		filters.tags.length === 0
	);
};

const ProductResultsProvider = ({ children }) => {
	const pathname = usePathname();
	const router = useRouter();
	const [filterOptions, setFilterOptions] = useState(null);
	const [filters, setFilters] = useState(emptyFilters);

	const setBrand = (brand) => {
		setFilters({
			...filters,
			brand: brand === filters.brand ? '' : brand
		});
	};

	const setColor = (color) => {
		setFilters({
			...filters,
			color: color === filters.color ? '' : color
		});
	};

	const setPriceRange = (minPrice, maxPrice) => {
		setFilters({
			...filters,
			minPrice: minPrice,
			maxPrice: maxPrice
		});
	};

	const setSize = (size) => {
		setFilters({
			...filters,
			size: size === filters.size ? 0 : size
		});
	};

	const addTag = (tag) => {
		let newTags;

		if (filters.tags.includes(tag)) {
			newTags = filters.tags.filter((tagToCompage) => tagToCompage !== tag);
		} else {
			newTags = filters.tags;
			newTags.push(tag);
		}

		setFilters({
			...filters,
			tags: newTags
		});
	};

	useEffect(() => {
		if (pathname.includes('/products') && !filterOptions) {
			getFilterOptions()
				.then((data) => setFilterOptions(data))
				.catch(() => setFilterOptions(emptyFilterOptions));
		}
	}, []);

	useEffect(() => {
		if (
			filterOptions &&
			filters &&
			!isEmptyFilters(filters, filterOptions) &&
			!pathname.includes('/filter')
		) {
			console.log(filters);
			router.push('/products/filter');
		}
	}, [filters]);

	return (
		<ProductResultsContext.Provider
			value={{
				filterOptions,
				filters,
				setBrand,
				setColor,
				setPriceRange,
				setSize,
				addTag
			}}
		>
			{children}
		</ProductResultsContext.Provider>
	);
};

export default ProductResultsProvider;
