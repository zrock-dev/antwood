'use client';
import Section from '@/components/Section';
import { useEffect, useState } from 'react';

const PriceSection = ({
	minPrice,
	maxPrice,
	setPriceRange,
	isOpen = false
}) => {
	const [max, setMax] = useState(maxPrice);

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
						defaultValue={maxPrice}
						onMouseUp={(e) => setMax(e.target.value)}
						title={`${minPrice} $   -   ${max} $`}
					/>
				</div>
				<div className="filter-prices">
					<span>{minPrice} $</span>
					<span>{max} $</span>
				</div>
			</div>
		</Section>
	);
};

export default PriceSection;
