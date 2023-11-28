'use client';
import Section from '@/components/Section';

const OthersSection = ({ tags, addTag, currentTags }) => {
	return (
		<Section style="secction-container space-left-30" title={'Others'}>
			<div className="filter-text-container">
				{tags.map((tag, index) => (
					<button
						className={`filter-text ${currentTags.includes(tag) && 'selected'}`}
						key={index}
						onClick={() => addTag(tag)}
					>
						{tag}
					</button>
				))}
			</div>
		</Section>
	);
};

export default OthersSection;
