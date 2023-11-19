'use client';

import { getSneakerSearchSuggestions } from '@/requests/SneakersRequest';
import { useEffect, useState } from 'react';

import '../../styles/search/search.css';
import SearchIcon from '@/icons/SearchIcon';

const Searcher = () => {
	const [input, setInput] = useState('');
	const [suggestions, setSuggestions] = useState([]);

	useEffect(() => {
		if (input.trim() !== '') {
			getSneakerSearchSuggestions(input)
				.then((data) => setSuggestions(data.names))
				.catch((e) => console.log(e));
		} else {
			setSuggestions([]);
		}
	}, [input]);

	return (
		<div className="search-main-container">
			<div className="search-searcher-container">
				<input
					type="text"
					placeholder="Search"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					autoComplete="false"
				/>
				<button title="search">
					<SearchIcon />
				</button>
			</div>
			{suggestions?.length > 0 && (
				<div className="search-suggestions-container">
					{suggestions.map((suggestion, index) => (
						<button className="search-suggestion" name={suggestion} key={index}>
							<SearchIcon />
							{suggestion}
						</button>
					))}
				</div>
			)}
		</div>
	);
};

export default Searcher;
