'use client';
import Section from '@/components/Section';

const BrandSection = ({ brands }) => {
	return (
		<Section title={'Brands'}>
			<div>
				{brands.map((brand, index) => (
					<button key={index}>{brand}</button>
				))}
			</div>
		</Section>
	);
};

export default BrandSection;
