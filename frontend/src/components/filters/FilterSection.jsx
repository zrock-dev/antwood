'use client';

import Minus from '@/icons/Minus';
import Plus from '@/icons/Plus';
import { useEffect, useRef, useState } from 'react';

const FilterSection = ({ title, children }) => {
	const ref = useRef(null);
	const [isDisplaying, setDisplaying] = useState(false);

	return (
		<div>
			<button onClick={() => setDisplaying(!isDisplaying)}>
				<span>{title}</span>
				{isDisplaying ? <Plus /> : <Minus />}
			</button>
			{isDisplaying && children}
		</div>
	);
};

export default FilterSection;
