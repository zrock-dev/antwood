'use client';
import Section from '@/components/Section';
import { useState } from 'react';

const SizeSection = ({ sizes }) => {
	const [sizeIndex, setSizeIndex] = useState(0);

	return (
		<Section title={'Sizes'}>
			<div>
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
