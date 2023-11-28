'use client';
import Section from '@/components/Section';
import '../../../styles/filters/filterColor.css';

const ColorSection = ({ colors }) => {
	return (
		<Section title={'Colors'}>
			<div className="filter-color-container">
				{colors.map((color, index) => (
					<button
						className="filter-color"
						style={{ backgroundColor: color }}
						key={index}
					></button>
				))}
			</div>
		</Section>
	);
};

export default ColorSection;
