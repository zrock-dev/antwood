'use client';

import { ProductResultsContext } from '@/context/ProductResultsContext';
import { useContext } from 'react';
import Sorter from '../filters/sorter/Sorter';

const SubNavbar = () => {
	const {} = useContext(ProductResultsContext);

	return (
		<div className="subnavbar-main-container width-100">
			<h3>All</h3>
			<Sorter />
		</div>
	);
};

export default SubNavbar;
