'use client';

import { getSearchSuggestions } from '@/requests/SneakersRequest';
import { useEffect, useState, useRef } from 'react';

import '../../styles/search/search.css';
import SearchIcon from '@/icons/SearchIcon';
import SearchSuggestion from './SearchSuggestion';
import { useParams, usePathname, useRouter } from 'next/navigation';

const Searcher = ({
	fecthSuggestions = getSearchSuggestions,
	searchRoute = '/products/search'
}) => {
	const router = useRouter();
	const pathname = usePathname();
	const params = useParams();
	const suggestionsElements = useRef(null);
	const [suggestions, setSuggestions] = useState([]);
	const [searchState, setSearchState] = useState({
		input: '',
		isTyping: true,
		noSuggested: true,
		notMoving: true,
		indexSuggesion: -1
	});

	const searchContainer = useRef();

	const handleKeyAcctions = (event) => {
		event.key === 'Enter' && search(searchState.input);
		event.key === 'ArrowDown' && moveToBottomSuggestion();
		event.key === 'ArrowUp' && moveToTopSuggestion();
	};

	const search = (inputToSearch) => {
		if (inputToSearch.trim() !== '') {
			router.push(`${searchRoute}/${inputToSearch}`);
		}
	};

	const selectSuggestion = (suggestion) => {
		setSearchState({
			...searchState,
			input: suggestion,
			isTyping: false,
			noSuggested: false
		});
		search(suggestion);
	};

	const moveToTopSuggestion = () => {
		const newIndex =
			searchState.indexSuggesion <= 0
				? suggestions.length - 1
				: searchState.indexSuggesion - 1;

		setSearchState({
			...searchState,
			input: suggestions[newIndex],
			indexSuggesion: newIndex,
			notMoving: false
		});
	};

	const moveToBottomSuggestion = () => {
		const newIndex =
			searchState.indexSuggesion === suggestions.length - 1
				? 0
				: searchState.indexSuggesion + 1;

		setSearchState({
			...searchState,
			input: suggestions[newIndex],
			indexSuggesion: newIndex,
			notMoving: false
		});
	};

	const removeSuggestionsOver = () => {
		if (suggestionsElements && suggestionsElements.current) {
			let childNode;
			for (let i = 0; i < suggestionsElements.current.childNodes.length; i++) {
				childNode = suggestionsElements.current.childNodes[i];
				if (childNode.nodeType === Node.ELEMENT_NODE) {
					childNode.classList.remove('over');
				}
			}
		}
	};

	const setSearchInput = () => {
		if (pathname.includes('search')) {
			let { input } = params;
			input = input.replaceAll('%20', ' ');
			input = input.replaceAll('%C3%A7', 'ç');
			setSearchState({
				...searchState,
				input,
				isTyping: false
			});
		}
	};

	useEffect(() => {
		setSearchInput();
		let onClickHandler = (e) => {
			if (
				searchContainer.current &&
				!searchContainer.current.contains(e.target)
			) {
				setSearchState((prev) => ({
					...prev,
					isTyping: false
				}));
			}
		};

		document.addEventListener('mousedown', onClickHandler);
		return () => {
			document.removeEventListener('mousedown', onClickHandler);
		};
	}, []);

	useEffect(() => {
		if (
			searchState.input &&
			searchState.noSuggested &&
			searchState.isTyping &&
			searchState.notMoving
		) {
			setSearchState({
				...searchState,
				isTyping: true
			});
			if (searchState.input.trim() !== '') {
				fecthSuggestions(searchState.input)
					.then((data) => setSuggestions(data.names))
					.catch((e) => console.log(e));
			} else {
				setSuggestions([]);
			}
		}
	}, [searchState.input]);

	useEffect(() => {
		if (
			suggestionsElements &&
			suggestionsElements.current &&
			searchState?.indexSuggesion > -1
		) {
			removeSuggestionsOver();
			suggestionsElements.current.childNodes[
				searchState.indexSuggesion
			].classList.add('over');
		}
	}, [searchState.indexSuggesion]);

	return (
		<div ref={searchContainer} className="search-main-container">
			<div className="search-searcher-container">
				<input
					type="text"
					placeholder="Search"
					value={searchState.input}
					onKeyDown={handleKeyAcctions}
					onChange={(e) =>
						setSearchState({
							input: e.target.value === '' ? new String() : e.target.value,
							isTyping: true,
							noSuggested: true,
							notMoving: true,
							indexSuggesion: -1
						})
					}
					autoComplete="false"
				/>
				<button title="search" onClick={() => search(searchState.input)}>
					<SearchIcon />
				</button>
			</div>
			{searchState.noSuggested &&
				suggestions?.length > 0 &&
				searchState.isTyping && (
					<div
						className="search-suggestions-container"
						ref={suggestionsElements}
					>
						{suggestions.map((suggestion, index) => (
							<SearchSuggestion
								key={index}
								suggestion={suggestion}
								input={searchState.input}
								selectSuggestion={selectSuggestion}
								removeSuggestionsOver={removeSuggestionsOver}
							/>
						))}
					</div>
				)}
		</div>
	);
};

export default Searcher;
