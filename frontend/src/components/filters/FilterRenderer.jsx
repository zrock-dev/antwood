'use client';

import Section from '../Section';
import '../../styles/filters/filters.css';

const FilterRenderer = () => {
	return (
		<div className='filter-main-container'>
			<h3>FILTERS</h3>
			<span className="horizontal-separator"></span>
			<Section title="Brands">
				<div>Brands</div>
			</Section>
			<span className="horizontal-separator"></span>
			<Section title="Others">
				<div>Others</div>
			</Section>
			<span className="horizontal-separator"></span>
			<Section title="Sizes">
				<div>Sizes</div>
			</Section>
			<span className="horizontal-separator"></span>
			<Section title="Colors">
				<div>Colors</div>
			</Section>
		</div>
	);
};

export default FilterRenderer;
