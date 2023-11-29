'use client';
import Section from '@/components/Section';
import { useEffect, useState } from 'react';

const PriceSection = ({
	minPrice,
	maxPrice,
	currentMaxPrice,
	setPriceRange,
	isOpen = false
}) => {
	const [currentMax, setCurrentMax] = useState(currentMaxPrice);
	const [max, setMax] = useState(currentMaxPrice);

	useEffect(() => {
		setPriceRange(minPrice, max);
	}, [max]);

	return (
		<Section
			style="secction-container space-left-30"
			title={'Prices'}
			isOpen={isOpen}
		>
			<div className="filter-price-main-container">
				<div className="filter-prices-container">
					<span className="filter-price-min"></span>

					<input
						type="range"
						min={minPrice}
						max={maxPrice}
						defaultValue={currentMaxPrice}
						onChange={(e) => setCurrentMax(e.target.value)}
						onMouseUp={(e) => setMax(e.target.value)}
						title={`${minPrice} $   -   ${max} $`}
					/>
				</div>
				<div className="filter-prices">
					<span>{minPrice} $</span>
					<span>{currentMax} $</span>
				</div>
			</div>
		</Section>
	);
};

export default PriceSection;
