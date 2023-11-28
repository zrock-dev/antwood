'use client';
import Section from '@/components/Section';

const BrandSection = ({ brands, setBrand, currentBrand }) => {
	return (
		<Section style="secction-container space-left-30" title={'Brands'}>
			<div className="filter-text-container">
				{brands.map((brand, index) => (
					<button
						className={`filter-text ${currentBrand === brand && 'selected'}`}
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
