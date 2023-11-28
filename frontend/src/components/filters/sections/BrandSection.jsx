'use client';
import Section from '@/components/Section';

const BrandSection = ({ brands }) => {
	return (
		<Section title={'Brands'}>
			<div className="filter-text-container">
				{brands.map((brand, index) => (
					<button className="filter-text" key={index}>
						{brand}
					</button>
				))}
			</div>
		</Section>
	);
};

export default BrandSection;
