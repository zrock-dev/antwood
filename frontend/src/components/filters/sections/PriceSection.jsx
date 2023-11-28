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
				<button>{minPrice}</button>
				<button>{maxPrice}</button>
			</div>
		</Section>
	);
};

export default PriceSection;
