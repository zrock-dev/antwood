'use client';

import { useContext } from 'react';
import { ProductResultsContext } from '@/context/ProductResultsContext';

import '../../styles/filters/filters.css';
import BrandSection from './sections/BrandSection';
import OthersSection from './sections/OthersSection';
import SizeSection from './sections/SizeSection';
import ColorSection from './sections/ColorSection';
import PriceSection from './sections/PriceSection';

const FilterRenderer = () => {
	const { filters } = useContext(ProductResultsContext);

	return (
		<div className="filter-main-container">
			<h3>FILTERS</h3>
			<span className="horizontal-separator"></span>
			{filters ? (
				<div>
					<BrandSection brands={filters.brands} />
					<span className="horizontal-separator"></span>

					<OthersSection tags={filters.tags} />
					<span className="horizontal-separator"></span>

					<SizeSection sizes={filters.sizes} />
					<span className="horizontal-separator"></span>

					<ColorSection colors={filters.colors} />
					<span className="horizontal-separator"></span>

					<PriceSection
						minPrice={filters.minPrice}
						maxPrice={filters.maxPrice}
					/>
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
