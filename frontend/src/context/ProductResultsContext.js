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

export const defaultSorter = {
	sortField: 'lastDate',
	sortOrder: 'asc'
};

const ProductResultsProvider = ({ children }) => {
	const pathname = usePathname();
	const router = useRouter();
	const [filterOptions, setFilterOptions] = useState(null);
	const [filters, setFilters] = useState(null);
	const [sorter, setSorter] = useState(null);

	const setSort = (sortField, sortOrder) => {
		setSorter({
			sortField,
			sortOrder
		});
	};

	const setBrand = (brand) => {
		setFilters((prev) => ({
			...prev,
			brand: brand === filters.brand ? '' : brand
		}));
		router.push('/products/filter');
	};

	const setColor = (color) => {
		setFilters((prev) => ({
			...prev,
			color: color === filters.color ? '' : color
		}));
		router.push('/products/filter');
	};

	const setPriceRange = (minPrice, maxPrice) => {
		setFilters((prev) => ({
			...prev,
			minPrice: minPrice,
			maxPrice: maxPrice
		}));
		if (minPrice > 0 && maxPrice > 0 && maxPrice !== filterOptions.maxPrice) {
			router.push('/products/filter');
		}
	};

	const setSize = (size) => {
		setFilters((prev) => ({
			...prev,
			size: size === filters.size ? 0 : size
		}));
		router.push('/products/filter');
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
		router.push('/products/filter');
	};

	const clearFiltersAndRedirect = (redirection = '/') => {
		clearFilters();
		router.push(redirection);
	};

	const clearFilters = () => {
		setFilters(emptyFilters);
	};

	const isEmptyFilters = () => {
		return (
			filterOptions &&
			filters &&
			filters.brand === '' &&
			filters.color === '' &&
			filters.minPrice === 0 &&
			filters.maxPrice === 0 &&
			filters.size === 0 &&
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

	useEffect(() => {
		const sorterSaved = getItem('sorter');
		if (sorterSaved) {
			setSorter(stringToJson(sorterSaved));
		} else {
			setSorter(defaultSorter);
		}
	}, []);

	useEffect(() => {
		if (sorter) {
			console.log(sorter);
			saveItem(
				'sorter',
				JSON.stringify({
					...sorter
				})
			);
		}
	}, [sorter]);

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
				isEmptyFilters,
				clearFiltersAndRedirect,
				clearFilters,
				sorter,
				setSort
			}}
		>
			{children}
		</ProductResultsContext.Provider>
	);
};

export default ProductResultsProvider;
