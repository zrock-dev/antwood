'use client';
import Section from '@/components/Section';

const PriceSection = ({ minPrice, maxPrice }) => {
	return (
		<Section title={'Prices'}>
			<div>
				<button>{minPrice}</button>
				<button>{maxPrice}</button>
			</div>
		</Section>
	);
};

export default PriceSection;
