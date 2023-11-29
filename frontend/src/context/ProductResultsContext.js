'use client';
import { getFilterOptions } from '@/requests/SneakersRequest';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
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

export const emptyFilters = {
	brand: '',
	color: '',
	minPrice: 0,
	maxPrice: 0,
	size: 0,
	tags: []
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
		router.push(`/products/filter`);
	};

	const setColor = (color) => {
		setFilters({
			...filters,
			color: color === filters.color ? '' : color
		});
		router.push(`/products/filter`);
	};

	const setPriceRange = (minPrice, maxPrice) => {
		setFilters({
			...filters,
			minPrice: minPrice,
			maxPrice: maxPrice
		});
		router.push(`/products/filter`);
	};

	const setSize = (size) => {
		setFilters({
			...filters,
			size: size === filters.size ? 0 : size
		});
		router.push(`/products/filter`);
	};

	const addTag = (tag) => {
		let newTags = filters.tags;
		if (tag === 'men') {
			newTags = filters.tags.filter(
				(tagToCompare) => tagToCompare !== 'women' && tagToCompare !== 'kids'
			);
		} else if (tag === 'women') {
			newTags = filters.tags.filter(
				(tagToCompare) => tagToCompare !== 'men' && tagToCompare !== 'kids'
			);
		} else if (tag === 'kids') {
			newTags = filters.tags.filter(
				(tagToCompare) => tagToCompare !== 'women' && tagToCompare !== 'men'
			);
		}

		if (newTags.includes(tag)) {
			newTags = newTags.filter((tagToCompage) => tagToCompage !== tag);
		} else {
			newTags.push(tag);
		}

		setFilters({
			...filters,
			tags: newTags
		});
		router.push(`/products/filter`);
	};

	const isEmptyFilters = () => {
		return (
			filters.brand === '' &&
			filters.color === '' &&
			filters.minPrice == 0 &&
			filters.maxPrice == 0 &&
			filters.size == 0 &&
			filters.tags.length <= 0
		);
	};

	useEffect(() => {
		if (pathname.includes('/products') && !filterOptions) {
			getFilterOptions()
				.then((data) => setFilterOptions(data))
				.catch(() => setFilterOptions(emptyFilterOptions));
		}
	}, []);

	return (
		<ProductResultsContext.Provider
			value={{
				filterOptions,
				filters,
				setBrand,
				setColor,
				setPriceRange,
				setSize,
				addTag,
				isEmptyFilters
			}}
		>
			{children}
		</ProductResultsContext.Provider>
	);
};

export default ProductResultsProvider;
