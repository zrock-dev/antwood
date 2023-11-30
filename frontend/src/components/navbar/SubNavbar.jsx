'use client';

import { ProductResultsContext } from '@/context/ProductResultsContext';
import { useContext } from 'react';
import Sorter from '../filters/sorter/Sorter';

const SubNavbar = () => {
	const { filters } = useContext(ProductResultsContext);

	return (
		<div className="subnavbar-main-container width-100">
			<h3>
				{filters &&
					(filters.tags.includes('men')
						? 'MEN'
						: filters.tags.includes('women')
						? 'WOMEN'
						: filters.tags.includes('kids')
						? 'KIDS'
						: 'All')}
			</h3>
			<Sorter />
		</div>
	);
};

export default SubNavbar;
