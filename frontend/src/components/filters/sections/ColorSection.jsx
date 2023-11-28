'use client';
import Section from '@/components/Section';

const ColorSection = ({ colors }) => {
	return (
		<Section title={'Colors'}>
			<div className="secction-item-row">
				{colors.map((color, index) => (
					<button style={{ backgroundColor: color }} key={index}>
						{color}
					</button>
				))}
			</div>
		</Section>
	);
};

export default ColorSection;
