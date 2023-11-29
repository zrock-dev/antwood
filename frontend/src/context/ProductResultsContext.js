'use client';
import { getFilterOptions } from '@/requests/SneakersRequest';
import { stringToJson } from '@/utils/Parser';
import { getItem, saveItem } from '@/utils/StorageManagement';
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
	const [filters, setFilters] = useState(null);

	const setBrand = (brand) => {
		setFilters((prev) => ({
			...prev,
			brand: brand === filters.brand ? '' : brand
		}));
	};

	const setColor = (color) => {
		setFilters((prev) => ({
			...prev,
			color: color === filters.color ? '' : color
		}));
	};

	const setPriceRange = (minPrice, maxPrice) => {
		setFilters((prev) => ({
			...prev,
			minPrice: minPrice,
			maxPrice: maxPrice
		}));
	};

	const setSize = (size) => {
		setFilters((prev) => ({
			...prev,
			size: size === filters.size ? 0 : size
		}));
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

		setFilters((prev) => ({
			...prev,
			tags: newTags
		}));
	};

	const isEmptyFilters = () => {
		return (
			filterOptions &&
			filters &&
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

	useEffect(() => {
		const filtersSaved = getItem('filters');
		if (filtersSaved) {
			setFilters(stringToJson(filtersSaved));
		} else {
			setFilters(emptyFilters);
		}
	}, []);

	useEffect(() => {
		if (filters) {
			saveItem(
				'filters',
				JSON.stringify({
					...filters
				})
			);
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
				addTag,
				isEmptyFilters
			}}
		>
			{children}
		</ProductResultsContext.Provider>
	);
};

export default ProductResultsProvider;
