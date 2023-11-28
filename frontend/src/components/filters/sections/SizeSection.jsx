'use client';
import Section from '@/components/Section';
import { useState } from 'react';

const SizeSection = ({ sizes }) => {
	const [sizeIndex, setSizeIndex] = useState(0);

	return (
		<Section style="secction-container space-left-30" title={'Sizes'}>
			<div className="sneaker-size-container">
				{sizes.map((size, index) => (
					<button
						className={`sneaker-size ${sizeIndex === index && 'selected'}`}
						key={index}
					>
						{size}
					</button>
				))}
			</div>
		</Section>
	);
};

export default SizeSection;
