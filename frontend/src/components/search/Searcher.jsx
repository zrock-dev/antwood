'use client';

import { getSneakerSearchSuggestions } from '@/requests/SneakersRequest';
import { useEffect, useState } from 'react';

const Searcher = () => {
	const [input, setInput] = useState('');

	useEffect(() => {
		if (input !== '') {
			getSneakerSearchSuggestions(input)
				.then((response) => console.log(response))
				.catch('error getting suggestions');
		}
	}, [input]);
	return (
		<div>
			<input
				type="text"
				placeholder="Search"
				value={input}
				onChange={(e) => setInput(e.target.value)}
			/>
			<button>Search</button>
		</div>
	);
};

export default Searcher;
