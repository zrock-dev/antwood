'use client';
import Minus from '@/icons/Minus';
import Plus from '@/icons/Plus';
import { useState } from 'react';

const Section = ({ title, children, isOpen = false }) => {
	const [isDisplaying, setDisplaying] = useState(isOpen);

	return (
		<div className="secction-container">
			<button
				className="secction-title"
				onClick={() => setDisplaying(!isDisplaying)}
			>
				<span>{title}</span>
				{isDisplaying ? <Plus /> : <Minus />}
			</button>
			{isDisplaying && children}
		</div>
	);
};

export default Section;
