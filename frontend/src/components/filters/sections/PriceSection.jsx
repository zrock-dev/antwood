'use client';
import Section from '@/components/Section';

const PriceSection = ({
	minPrice,
	maxPrice,
	setPriceRange,
	currentMinPrice,
	currentMaxPrice
}) => {
	return (
		<Section style="secction-container space-left-30" title={'Prices'}>
			<div>
				<input
					type="range"
					min={minPrice}
					max={maxPrice}
					defaultValue={maxPrice}
					onMouseUp={(e) => setPriceRange(minPrice, e.target.value)}
				/>
			</div>
		</Section>
	);
};

export default PriceSection;
