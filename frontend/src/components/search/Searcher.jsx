'use client';

import { getSneakerSearchSuggestions } from '@/requests/SneakersRequest';
import { useEffect, useState, useRef } from 'react';

import '../../styles/search/search.css';
import SearchIcon from '@/icons/SearchIcon';
import SearchSuggestion from './SearchSuggestion';

const Searcher = () => {
	const [input, setInput] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [isOpen, setOpen] = useState({
		isTyping: true,
		noSuggested: true
	});
	const suggestionContainer = useRef();

	const selectSuggestion = (suggestion) => {
		setInput(suggestion);
		setOpen({
			isTyping: false,
			noSuggested: false
		});
	};

	useEffect(() => {
		if (isOpen.noSuggested && isOpen.isTyping) {
			setOpen({
				...isOpen,
				isTyping: true
			});
			if (input.trim() !== '') {
				getSneakerSearchSuggestions(input)
					.then((data) => setSuggestions(data.names))
					.catch((e) => console.log(e));
			} else {
				setSuggestions([]);
			}
		}
	}, [input]);

	useEffect(() => {
		let onClickHandler = (e) => {
			if (
				suggestionContainer.current &&
				!suggestionContainer.current.contains(e.target)
			) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', onClickHandler);
		return () => {
			document.removeEventListener('mousedown', onClickHandler);
		};
	}, []);

	return (
		<div ref={suggestionContainer} className="search-main-container">
			<div className="search-searcher-container">
				<input
					type="text"
					placeholder="Search"
					value={input}
					onChange={(e) => {
						setInput(e.target.value);
						setOpen({
							isTyping: true,
							noSuggested: true
						});
					}}
					autoComplete="false"
				/>
				<button title="search">
					<SearchIcon />
				</button>
			</div>
			{isOpen.noSuggested && isOpen.isTyping && suggestions?.length > 0 && (
				<div className="search-suggestions-container">
					{suggestions.map((suggestion, index) => (
						<SearchSuggestion
							key={index}
							suggestion={suggestion}
							input={input}
							selectSuggestion={selectSuggestion}
						/>
					))}
				</div>
			)}
		</div>
	);
};

export default Searcher;
