'use client';

import { ProductResultsContext } from '@/context/ProductResultsContext';
import { useContext, useRef, useEffect, useState } from 'react';
import '../../../styles/filters/sorter.css';
import SortIcon from '@/icons/SortIcon';

const Sorter = () => {
	const [isOpen, setOpen] = useState(false);
	const sortButton = useRef();
	const { sorter, setSort } = useContext(ProductResultsContext);

	useEffect(() => {
		if (isOpen) {
			sortButton?.current.classList.add('active');
		} else {
			sortButton?.current.classList.remove('active');
		}
	}, [isOpen]);

	useEffect(() => {
		let onClickHandler = (e) => {
			if (sortButton.current && !sortButton.current.contains(e.target)) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', onClickHandler);
		return () => {
			document.removeEventListener('mousedown', onClickHandler);
		};
	}, []);

	return (
		<div
			className="sorter-main-container"
			ref={sortButton}
			onClick={() => setOpen(!isOpen)}
		>
			<span className="sorter-title">
				Sort By{''}
				{sorter &&
					(sorter.sortField === 'lastDate' && sorter.sortOrder === 'asc' ? (
						<b>Oldest to Newest</b>
					) : sorter.sortField === 'lastDate' && sorter.sortOrder === 'desc' ? (
						<b>Newest to Oldest</b>
					) : sorter.sortField === 'salesQuantity' &&
					  sorter.sortOrder === 'asc' ? (
						<b>Least to Most Sold</b>
					) : sorter.sortField === 'salesQuantity' &&
					  sorter.sortOrder === 'desc' ? (
						<b>Most to least Sold</b>
					) : (
						<b>
							{sorter.sortField}{' '}
							{sorter.sortOrder === 'asc' ? 'Ascending' : 'Descending'}{' '}
						</b>
					))}
				<SortIcon />
			</span>
			{isOpen && (
				<div className="sorter-options-container">
					<button
						className={`sorter-option ${
							sorter &&
							sorter.sortField === 'name' &&
							sorter.sortOrder === 'asc' &&
							'selected'
						}`}
						onClick={() => setSort('name', 'asc')}
					>
						Name Ascending
					</button>
					<button
						className={`sorter-option ${
							sorter &&
							sorter.sortField === 'name' &&
							sorter.sortOrder === 'desc' &&
							'selected'
						}`}
						onClick={() => setSort('name', 'desc')}
					>
						Name Descending
					</button>
					<button
						className={`sorter-option ${
							sorter &&
							sorter.sortField === 'price' &&
							sorter.sortOrder === 'asc' &&
							'selected'
						}`}
						onClick={() => setSort('price', 'asc')}
					>
						Price Ascending
					</button>
					<button
						className={`sorter-option ${
							sorter &&
							sorter.sortField === 'price' &&
							sorter.sortOrder === 'desc' &&
							'selected'
						}`}
						onClick={() => setSort('price', 'desc')}
					>
						Price Descending
					</button>
					<button
						className={`sorter-option ${
							sorter &&
							sorter.sortField === 'lastDate' &&
							sorter.sortOrder === 'asc' &&
							'selected'
						}`}
						onClick={() => setSort('lastDate', 'asc')}
					>
						Oldest to Newest
					</button>
					<button
						className={`sorter-option ${
							sorter &&
							sorter.sortField === 'lastDate' &&
							sorter.sortOrder === 'desc' &&
							'selected'
						}`}
						onClick={() => setSort('lastDate', 'desc')}
					>
						Newest to Oldest
					</button>
					<button
						className={`sorter-option ${
							sorter &&
							sorter.sortField === 'salesQuantity' &&
							sorter.sortOrder === 'desc' &&
							'selected'
						}`}
						onClick={() => setSort('salesQuantity', 'desc')}
					>
						Most to least Sold
					</button>
					<button
						className={`sorter-option ${
							sorter &&
							sorter.sortField === 'salesQuantity' &&
							sorter.sortOrder === 'asc' &&
							'selected'
						}`}
						onClick={() => setSort('salesQuantity', 'asc')}
					>
						Least to Most Sold
					</button>
				</div>
			)}
		</div>
	);
};

export default Sorter;
