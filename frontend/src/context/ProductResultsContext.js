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
	const params = useSearchParams();
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
		router.push(`/products/filter`);
	};

	const isEmptyFilters = () => {
		return (
			filters.brand === '' &&
			filters.color === '' &&
			(filters.minPrice == 0 || filters.minPrice == filterOptions.minPrice) &&
			(filters.maxPrice == 0 || filters.maxPrice == filterOptions.maxPrice) &&
			filters.size == 0 &&
			filters.tags.length <= 0
		);
	};

	const setCollection = (collection) => {
		let tags;
		if (collection === 'men') {
			tags = filters.tags.filter((tag) => tag !== 'women' && tag !== 'kids');
		} else if (collection === 'women') {
			tags = filters.tags.filter((tag) => tag !== 'men' && tag !== 'kids');
		} else if (collection === 'kids') {
			tags = filters.tags.filter((tag) => tag !== 'women' && tag !== 'men');
		}

		if (tags.includes(collection)) {
			tags = tags.filter((tagToCompage) => tagToCompage !== collection);
		} else {
			tags.push(collection);
		}
		setFilters({
			...filters,
			tags
		});
	};

	useEffect(() => {
		if (pathname.includes('/filter')) {
			const collection = params.get('collection');
			if (collection) {
				let tags;
				if (collection === 'men') {
					tags = filters.tags.filter(
						(tag) => tag !== 'women' && tag !== 'kids'
					);
				} else if (collection === 'women') {
					tags = filters.tags.filter((tag) => tag !== 'men' && tag !== 'kids');
				} else if (collection === 'kids') {
					tags = filters.tags.filter((tag) => tag !== 'women' && tag !== 'men');
				}

				if (tags.includes(collection)) {
					tags = tags.filter((tagToCompage) => tagToCompage !== collection);
				} else {
					tags.push(collection);
				}
				setFilters({
					...filters,
					tags
				});
			}
		}
	}, [params]);

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
				isEmptyFilters,
				setCollection
			}}
		>
			{children}
		</ProductResultsContext.Provider>
	);
};

export default ProductResultsProvider;
