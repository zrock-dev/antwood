'use client';

import { useContext } from 'react';
import { ProductResultsContext } from '@/context/ProductResultsContext';

import '../../styles/filters/filters.css';
import '../../styles/filters/filterText.css';
import BrandSection from './sections/BrandSection';
import OthersSection from './sections/OthersSection';
import SizeSection from './sections/SizeSection';
import ColorSection from './sections/ColorSection';
import PriceSection from './sections/PriceSection';
import Link from 'next/link';

const FilterRenderer = () => {
	const {
		filterOptions,
		filters,
		setBrand,
		setColor,
		setPriceRange,
		setSize,
		addTag
	} = useContext(ProductResultsContext);

	return (
		<div className="filters-main-container">
			<h3 className="space-left-30">FILTERS</h3>
			{filterOptions ? (
				<div className="filters-container">
					<span className="horizontal-separator margin-20px"></span>
					<BrandSection
						brands={filterOptions.brands}
						currentBrand={filters.brand}
						setBrand={setBrand}
					/>
					<span className="horizontal-separator margin-20px"></span>
					<OthersSection
						tags={filterOptions.tags}
						currentTags={filters.tags}
						addTag={addTag}
					/>
					<span className="horizontal-separator margin-20px"></span>
					<SizeSection
						sizes={filterOptions.sizes}
						currentSize={filters.size}
						setSize={setSize}
					/>
					<span className="horizontal-separator margin-20px"></span>
					<ColorSection
						colors={filterOptions.colors}
						currentColor={filters.color}
						setColor={setColor}
					/>
					<span className="horizontal-separator margin-20px"></span>
					<PriceSection
						minPrice={filterOptions.minPrice}
						maxPrice={filterOptions.maxPrice}
						setPriceRange={setPriceRange}
					/>
					<Link href={'/products/filter'}>Apply</Link>
				</div>
			) : (
				<div className="loader-container">
					<span className="loader"></span>
				</div>
			)}
		</div>
	);
};

export default FilterRenderer;
