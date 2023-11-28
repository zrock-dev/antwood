'use client';
import Section from '@/components/Section';

const OthersSection = ({ tags }) => {
	return (
		<Section title={'Others'}>
			<div className="filter-text-container">
				{tags.map((tag, index) => (
					<button className="filter-text" key={index}>
						{tag}
					</button>
				))}
			</div>
		</Section>
	);
};

export default OthersSection;
