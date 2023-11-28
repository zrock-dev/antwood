'use client';
import Section from '@/components/Section';

const SizeSection = ({ sizes, setSize, currentSize }) => {
	return (
		<Section style="secction-container space-left-30" title={'Sizes'}>
			<div className="sneaker-size-container">
				{sizes.map((size, index) => (
					<button
						className={`sneaker-size ${currentSize === size && 'selected'}`}
						key={index}
						onClick={() => setSize(size)}
					>
						{size}
					</button>
				))}
			</div>
		</Section>
	);
};

export default SizeSection;
