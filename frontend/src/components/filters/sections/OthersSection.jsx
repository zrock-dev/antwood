'use client';
import Section from '@/components/Section';

const OthersSection = ({ tags }) => {
	return (
		<Section title={'Others'}>
			<div>
				{tags.map((tag, index) => (
					<button key={index}>{tag}</button>
				))}
			</div>
		</Section>
	);
};

export default OthersSection;
