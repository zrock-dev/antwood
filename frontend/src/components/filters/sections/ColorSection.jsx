'use client';
import Section from '@/components/Section';
import '../../../styles/filters/filterColor.css';

const ColorSection = ({ colors, currentColor, setColor, isOpen = false }) => {
	return (
		<Section
			style="secction-container space-left-30"
			title={'Colors'}
			isOpen={isOpen}
		>
			<div className="filter-color-container">
				{colors.map((color, index) => (
					<button
						className={`filter-color ${currentColor === color && 'selected'}`}
						style={{ backgroundColor: color }}
						key={index}
						onClick={() => setColor(color)}
						title={color}
					></button>
				))}
			</div>
		</Section>
	);
};

export default ColorSection;
