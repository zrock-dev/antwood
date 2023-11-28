'use client';
import Section from '@/components/Section';

const BrandSection = ({ brands, setBrand }) => {
	return (
		<Section title={'Brands'}>
			<div className="filter-text-container">
				{brands.map((brand, index) => (
					<button
						className="filter-text"
						key={index}
						onClick={() => setBrand(brand)}
					>
						{brand}
					</button>
				))}
			</div>
		</Section>
	);
};

export default BrandSection;
