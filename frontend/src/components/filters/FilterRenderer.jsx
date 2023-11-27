'use client';

import FilterSection from './FilterSection';
import '../../styles/filters/filters.css';

const FilterRenderer = () => {
	return (
		<div className='filter-main-container'>
			<h3>FILTERS</h3>
			<span className="horizontal-separator"></span>
			<FilterSection title="Brands">
				<div>Brands</div>
			</FilterSection>
			<span className="horizontal-separator"></span>
			<FilterSection title="Others">
				<div>Others</div>
			</FilterSection>
			<span className="horizontal-separator"></span>
			<FilterSection title="Sizes">
				<div>Sizes</div>
			</FilterSection>
			<span className="horizontal-separator"></span>
			<FilterSection title="Colors">
				<div>Colors</div>
			</FilterSection>
		</div>
	);
};

export default FilterRenderer;
