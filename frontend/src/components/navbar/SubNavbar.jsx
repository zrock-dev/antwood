'use client';

import { ProductResultsContext } from '@/context/ProductResultsContext';
import { useContext } from 'react';

const SubNavbar = () => {
	const { setSort } = useContext(ProductResultsContext);

	return (
		<div className="subnavbar-main-container">
			<h3>All</h3>
			<div>
				<button onClick={() => setSort('name', 'asc')}>Name Ascending</button>
				<button onClick={() => setSort('name', 'desc')}>Name Descending</button>
				<button onClick={() => setSort('price', 'asc')}>Price Ascending</button>
				<button onClick={() => setSort('price', 'desc')}>
					Price Descending
				</button>
				<button onClick={() => setSort('lastDate', 'asc')}>
					Date Ascending
				</button>
				<button onClick={() => setSort('lastDate', 'desc')}>
					Date Descending
				</button>
			</div>
		</div>
	);
};

export default SubNavbar;
